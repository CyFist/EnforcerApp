import * as React from "react";
import _ from "lodash";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

import { useRecoilValue, useRecoilState } from "recoil";
import { RecordsAtom } from "../state/recordsState";
import { ModalAtom, ModalTitleAtom } from "../state/modalState";

import { restdbPost, restdbDelete } from "../utils/api_client";

const Addform = (props) => {
  return (
    <TextField
      sx={{
        my: 2,
        "& label.Mui-focused": {
          color: "primary.dark",
        },
        "& label.Mui-error": {
          color: "error.main",
        },
        "& .MuiOutlinedInput-root": {
          "&:hover fieldset": {
            borderColor: "primary.light",
          },
          "&.Mui-focused fieldset": {
            borderColor: "primary.light",
          },
          "&.Mui-error fieldset": {
            borderColor: "error.light",
          },
        },
      }}
      {...props}
    />
  );
};

export const Removeform = (props) => {
  const userRecords = useRecoilValue(RecordsAtom);
  return (
    <TextField
      sx={{
        my: 2,
        borderColor: "text.primary",
        "& label.Mui-focused": {
          color: "primary.main",
        },
        "& .MuiOutlinedInput-root": {
          "&:hover fieldset": {
            borderColor: "primary.main",
          },
          "&.Mui-focused fieldset": {
            borderColor: "primary.main",
          },
        },
      }}
      {...props}
    >
      {_.orderBy(userRecords, ["User"], ["asc"]).map((obj) => (
        <MenuItem
          sx={{
            mx: 0.5,
            borderRadius: 16,
            "&.Mui-selected": { bgcolor: "primary.main" },
          }}
          key={obj.User}
          value={obj.User}
        >
          {obj.User}
        </MenuItem>
      ))}
    </TextField>
  );
};

const UserManagement = () => {
  const userRecords = useRecoilValue(RecordsAtom);
  const [openModal, setOpenModal] = useRecoilState(ModalAtom);
  const modalTitle = useRecoilValue(ModalTitleAtom);

  const [AddbtnDisabled, setAddbtnDisabled] = React.useState(true);
  const [RembtnDisabled, setRembtnDisabled] = React.useState(true);
  const textfieldref = React.useRef();
  const [labelText, setLabelText] = React.useState("User");
  const [, setErrorText] = React.useState();
  const [value, setValue] = React.useState();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    borderRadius: 4,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
  };

  const AddonChange = (ev) => {
    setValue(ev.target.value.toUpperCase());

    const UserData = _.filter(userRecords, [
      "User",
      ev.target.value.toUpperCase(),
    ]);

    if (ev.target.value === "") {
      setAddbtnDisabled(true);
    } else {
      if (UserData.length === 0) {
        setAddbtnDisabled(false);
        setLabelText("User");
        setErrorText("");
      } else {
        setAddbtnDisabled(true);
        setErrorText("User in System");
        setLabelText("User in System");
      }
    }
  };

  const RemoveonChange = (ev) => {
    setValue(ev.target.value.toUpperCase());
    if (ev.target.value.toUpperCase() === "") {
      setRembtnDisabled(true);
    } else {
      setRembtnDisabled(false);
    }
  };

  return (
    <Modal
      open={openModal}
      onClose={() => {
        setOpenModal(false);
        setValue("");
      }}
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {modalTitle} User
        </Typography>
        {modalTitle === "Remove" ? (
          <Removeform
            select
            fullWidth
            label="Select User"
            inputRef={textfieldref}
            onChange={RemoveonChange}
          />
        ) : (
          <Addform
            label={labelText}
            name="User"
            fullWidth
            //autoFocus
            autoComplete="off"
            inputRef={textfieldref}
            onChange={AddonChange}
            value={value}
          />
        )}
        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            //TODO refine this
            const UserData = _.filter(userRecords, [
              "User",
              textfieldref.current.value.toUpperCase(),
            ]);

            modalTitle === "Remove"
              ? restdbDelete(`/records/${UserData[0]._id}`)
              : restdbPost(
                  "/records",
                  textfieldref.current.value.toUpperCase()
                );
            setOpenModal(false);
            setValue("");
          }}
          disabled={modalTitle === "Remove" ? RembtnDisabled : AddbtnDisabled}
        >
          Sumbit
        </Button>
      </Box>
    </Modal>
  );
};

export default UserManagement;
