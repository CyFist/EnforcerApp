import * as React from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { RemBoldfaceAtom, SelectedBFSelector } from '../state/bfState';
import { SelectedRecordAtom } from '../state/recordsState';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { useNavigate } from 'react-router-dom';

import Stepper from '../components/Stepper';
import TxtField from '../components/Textfield';
import { restdbPut } from '../utils/api_client';
import { getLines } from '../utils/helperfunc';

import _ from 'lodash';

import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/en-sg';

dayjs.locale('en-sg');
dayjs.extend(localeData);
dayjs.extend(isoWeek);

const Boldface = () => {
  const [{ bfs, Rem_bfs, Rem_bfs_num, bf_hdr, bf_elm }, handleOnSubmit] = useRecoilState(
    SelectedBFSelector
  );
  const resetRemBfs = useResetRecoilState(RemBoldfaceAtom);
  const selectedRec = useRecoilValue(SelectedRecordAtom);
  const txtRef = React.useRef([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (Rem_bfs_num === 0) {
      //TODO show all the loading page
      submit(selectedRec, navigate, resetRemBfs);
    }
  }, [Rem_bfs_num, selectedRec, navigate, resetRemBfs]);

  const handleOnInput = (e) => {
    const newValue = e.target.value;
    const newLines = getLines(newValue);

    const compactRefs = _.compact(txtRef.current);
    const current = _.findIndex(compactRefs, (element) => {
      return element === e.target;
    });
    const fst_txt = compactRefs[0];
    const curr_txt = compactRefs[current];
    const nxt_txt = compactRefs[current + 1];
    const lst_txt = compactRefs[compactRefs.length - 1];

    if (newLines > 0) {
      curr_txt.value = newValue.replace(/(\r\n|\n|\r)/gm, '');
      if (curr_txt === lst_txt) {
        //console.log('correct');
        handleOnSubmit({ updatetype: 'submit', newValue: Rem_bfs });
        curr_txt.value = '';
        fst_txt.focus();
      } else {
        nxt_txt.focus();
      }
    }
  };

  return (
    <Container>
      <Stepper Total={bfs} leftover={Rem_bfs} />
      <Typography variant="h5" mb={2}>
        {bf_hdr}
      </Typography>
      <Grid key="bfcontainer" container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
        {_.map(bf_elm, (value, key) => {
          if (_.startsWith(key, 'prompt')) {
            return (
              <Grid key={key} xs={12}>
                <Typography variant="body2">{value}</Typography>
              </Grid>
            );
          } else if (_.startsWith(key, 'answer')) {
            return (
              <TxtField
                key={key}
                onInput={(ev) => {
                  handleOnInput(ev);
                }}
                txtRefobj={txtRef}
                id={key}
                defaultValue={value}
              />
            );
          }
        })}
      </Grid>
    </Container>
  );
};

export default Boldface;

//TODO get most updated userRecords
function submit(selectedRec, navigate, resetState) {
  if (!_.isEmpty(selectedRec)) {
    const userobj = _.cloneDeep(selectedRec); //Create New instance of Record since Its a read-only.
    const allValid = dayjs().isoWeek() === dayjs(userobj.Quiz_Date).isoWeek() ? true : false;
    _.assign(userobj, { BF_Date: new Date().toISOString(), Valid: allValid });
    restdbPut(`/records/${selectedRec._id}`, userobj);
    navigate('/Overview');
  }
  resetState();
}
