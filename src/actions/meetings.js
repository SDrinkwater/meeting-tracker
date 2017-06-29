import {
  ADD_MEETING,
  REMOVE_MEETING_BY_ID,

  START_MEETING,
  STOP_MEETING,
  RESET_MEETING,
} from '../constants/ActionTypes';

import * as timerActions from './timers';

export const addMeeting = id => (
  (dispatch) => {
    dispatch(timerActions.addTimer(id));
    dispatch({
      type: ADD_MEETING,
      id,
    });
  }
);

export const removeMeetingById = id => (
  (dispatch) => {
    dispatch(timerActions.removeTimerById(id));
    dispatch({
      type: REMOVE_MEETING_BY_ID,
      id,
    });
  }
);

export const startMeeting = (id, baseTime) => (
  (dispatch) => {
    dispatch(timerActions.startTimer(id, baseTime));
    dispatch({
      type: START_MEETING,
      id,
    });
  }
);

export const stopMeeting = id => (
  (dispatch) => {
    dispatch(timerActions.stopTimer(id));
    dispatch({
      type: STOP_MEETING,
      id,
    });
  }
);

export const resetMeeting = id => (
  (dispatch) => {
    dispatch(timerActions.resetTimer(id));
    dispatch({
      type: RESET_MEETING,
      id,
    });
  }
);

