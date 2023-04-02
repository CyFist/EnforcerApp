import * as React from 'react';
import { restdbPut } from '../utils/api_client';
import { useNavigate } from 'react-router-dom';
import Stepper from '../components/Stepper';
import { OptionsGroup } from '../components/QuizCard';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import _ from 'lodash';
import { Container } from '@mui/material';
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil';
import { SampleQnAtom, SelectedQnSelector, SelectedOptionSelector } from '../state/quizState';
import { SelectedRecordAtom } from '../state/recordsState';

import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/en-sg';

dayjs.locale('en-sg');
dayjs.extend(localeData);
dayjs.extend(isoWeek);

const Quiz = () => {
  const { TotalSample, RemainingSample, SampleNum, Qns } = useRecoilValue(SelectedQnSelector);
  const handleOnSubmit = useSetRecoilState(SelectedQnSelector);
  const selected = useRecoilValue(SelectedOptionSelector);
  const resetSampleQn = useResetRecoilState(SampleQnAtom);
  const selectedRec = useRecoilValue(SelectedRecordAtom);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (SampleNum === 14) {
      //TODO show all the loading page
      submit(selectedRec, navigate, resetSampleQn);
    }
  }, [SampleNum, selectedRec, navigate, resetSampleQn]);

  return (
    <Container>
      <Stepper Total={TotalSample} leftover={RemainingSample} />
      <Typography variant="h5" my={3}>
        {Qns}
      </Typography>
      <OptionsGroup />
      <Button
        sx={{ mt: 3 }}
        fullWidth
        disableRipple
        disabled={selected.BtnState}
        size="small"
        variant="contained"
        onClick={() => handleOnSubmit(RemainingSample)}
      >
        Submit
      </Button>
    </Container>
  );
};

export default Quiz;

//TODO get most updated userRecords - consider merging with Qoldface submit
function submit(selectedRec, navigate, resetState) {
  if (!_.isEmpty(selectedRec)) {
    const userobj = _.cloneDeep(selectedRec); //Create New instance of Record since Its a read-only.
    const allValid = dayjs().isoWeek() === dayjs(userobj.BF_Date).isoWeek() ? true : false;
    _.assign(userobj, { Quiz_Date: new Date().toISOString(), Valid: allValid });
    restdbPut(`/records/${selectedRec._id}`, userobj);
    navigate('/Overview');
  }
  resetState();
}
