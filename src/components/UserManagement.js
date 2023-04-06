import * as React from "react";
import _ from "lodash";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Autocomplete from "@mui/material/Autocomplete";

import { useRecoilValue, useRecoilState } from "recoil";
import { RecordsAtom } from "../state/recordsState";
import { ModalAtom, ModalTitleAtom, ModalUserAtom } from "../state/modalState";

import { restdbPost, restdbDelete } from "../utils/api_client";

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 0.9,
  borderRadius: 4,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

const TxtField = (props) => {
  const userRecords = useRecoilValue(RecordsAtom);
  const value = useRecoilValue(ModalUserAtom);
  const modalTitle = useRecoilValue(ModalTitleAtom);
  return (
    <Autocomplete
      sx={{ my: 2 }}
      multiple
      id="tags-filled"
      options={userRecords.map((option) => option.User)}
      forcePopupIcon={false}
      {...props}
      renderInput={(params) => (
        <TextField
          {...params}
          inputProps={{
            ...params.inputProps,
            style: { textTransform: "uppercase" },
          }}
          placeholder={_.isEmpty(value) ? `${modalTitle} user` : "another user"}
        />
      )}
    />
  );
};

const UserManagement = () => {
  const userRecords = useRecoilValue(RecordsAtom);
  const [openModal, setOpenModal] = useRecoilState(ModalAtom);
  const modalTitle = useRecoilValue(ModalTitleAtom);
  const [value, setValue] = useRecoilState(ModalUserAtom);

  const [btnDisabled, setbtnDisabled] = React.useState(true);

  ///TODO track virtua keyboard state to adjust modal

  const AddonChange = (ev, newValue) => {
    const CapValue = newValue.map((value) => value.toUpperCase());
    const filterBasedonValue = _.compact(
      _.chain(userRecords).keyBy("User").at(CapValue).value()
    );
    const finalValue = _.isEmpty(filterBasedonValue)
      ? CapValue
      : _.dropRight(CapValue);
    setValue(finalValue);
    if (_.isEmpty(finalValue)) {
      setbtnDisabled(true);
    } else {
      setbtnDisabled(false);
    }
  };

  const RemoveonChange = (event, newValue) => {
    setValue(newValue);
    if (_.isEmpty(newValue)) {
      setbtnDisabled(true);
    } else {
      setbtnDisabled(false);
    }
  };

  return (
    <Modal
      open={openModal}
      onClose={() => {
        setOpenModal(false);
        setValue([]);
      }}
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {modalTitle} User
        </Typography>
        {modalTitle === "Remove" ? (
          <TxtField onChange={RemoveonChange} filterSelectedOptions />
        ) : (
          <TxtField
            onChange={AddonChange}
            freeSolo
            value={value}
            open={false}
          />
        )}
        <Button
          sx={{ alignSelf: "center" }}
          variant="contained"
          onClick={() => {
            modalTitle === "Remove"
              ? restdbDelete(
                  "/records/*",
                  _.map(value, (obj, key) => {
                    return obj._id;
                  })
                )
              : restdbPost("/records", value);
            setOpenModal(false);
            setValue([]);
          }}
          disabled={btnDisabled}
        >
          Confirm
        </Button>
      </Box>
    </Modal>
  );
};

export default UserManagement;
