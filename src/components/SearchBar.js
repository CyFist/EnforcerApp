import * as React from 'react';
import { Context } from '../utils/Context';
import _ from 'lodash';

import { useForm, Controller } from 'react-hook-form';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import PersonRemoveAlt1OutlinedIcon from '@mui/icons-material/PersonRemoveAlt1Outlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';

import { useRecoilState, useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil';
import { queryAtom } from '../state/queryState';

export default function SearchBar() {
  const [query, setQuery] = useRecoilState(queryAtom);
  const resetQuery = useResetRecoilState(queryAtom);
  const { setOpenModal, setModalTitle } = React.useContext(Context);

  const { control, handleSubmit, reset } = useForm({
    reValidateMode: 'onBlur'
  });

  const handleOpen = (titletext) => {
    setModalTitle(titletext);
    setOpenModal(true);
    //setValue('');
  };

  return (
    <Paper
      component="form"
      sx={{
        px: 1,
        py: 0.25,
        mb: 1.5,
        display: 'flex',
        alignItems: 'center',
        width: 'auto',
        borderRadius: 8,
        bgcolor: 'background.paper'
      }}
      elevation={0}
    >
      <InputBase
        id="SearchUser"
        autoComplete="off"
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search user"
        value={query}
        onChange={(e) => setQuery(e.target.value.toUpperCase())}
      />
      <IconButton
        disableRipple
        p={1}
        aria-label="search"
        disabled={!query}
        onClick={() => resetQuery()}
      >
        {!query ? <SearchIcon /> : <ClearIcon />}
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5, bgcolor: 'text.primary' }} orientation="vertical" />
      <IconButton
        disableRipple
        p={1}
        aria-label="addUser"
        onClick={() => {
          handleOpen('Add');
        }}
      >
        <PersonAddOutlinedIcon />
      </IconButton>
      <IconButton
        disableRipple
        p={1}
        aria-label="removeUser"
        onClick={() => {
          handleOpen('Remove');
        }}
      >
        <PersonRemoveAlt1OutlinedIcon />
      </IconButton>
    </Paper>
  );
}
