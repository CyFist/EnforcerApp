import * as React from 'react';
import { useRecoilState } from 'recoil';
import { TxtFieldAtomFamily } from '../state/bfState';

import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';

import split from 'lodash/split';

const TxtField = (props) => {
  const [value, setValue] = useRecoilState(TxtFieldAtomFamily(props.id));
  const indx = parseInt(split(props.id, '_')[1], 0) - 1;

  return (
    <Grid xs={6}>
      <TextField
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'text.secondary'
            }
          }
        }}
        fullWidth={true}
        id={props.id}
        variant="outlined"
        size="small"
        multiline
        autoComplete="off"
        inputProps={{
          style: { fontSize: '0.75rem', textTransform: 'uppercase' }
        }}
        inputRef={(el) => (props.txtRefobj.current[indx] = el)}
        onInput={props.onInput}
        onChange={(ev) => setValue(ev.target.value)}
        placeholder={props.defaultValue}
        {...{ value }}
      />
    </Grid>
  );
};

export default TxtField;
