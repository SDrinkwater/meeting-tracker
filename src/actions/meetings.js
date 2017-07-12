import {
  ADD_MEETING,
  REMOVE_MEETING_BY_ID,
  SET_MEETING_TITLE,
  SET_MEETING_ATTENDEES,
  MOVE_MEETING,

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
      payload: id,
    });
  }
);

export const removeMeetingById = id => (
  (dispatch) => {
    dispatch(timerActions.removeTimerById(id));
    dispatch({
      type: REMOVE_MEETING_BY_ID,
      payload: id,
    });
  }
);

export const setMeetingTitle = (id, title) => ({
  type: SET_MEETING_TITLE,
  payload: { id, title },
});

export const setMeetingAttendees = (id, attendees) => ({
  type: SET_MEETING_ATTENDEES,
  payload: { id, attendees: parseInt(attendees, 10) },
});

export const moveMeeting = (oldIndex, newIndex) => ({
  type: MOVE_MEETING,
  payload: { oldIndex, newIndex },
});

export const startMeeting = (id, baseTime) => (
  (dispatch) => {
    dispatch(timerActions.startTimer(id, baseTime));
    dispatch({
      type: START_MEETING,
      payload: id,
    });
  }
);

export const stopMeeting = id => (
  (dispatch) => {
    dispatch(timerActions.stopTimer(id));
    dispatch({
      type: STOP_MEETING,
      payload: id,
    });
  }
);

export const resetMeeting = id => (
  (dispatch) => {
    dispatch(timerActions.resetTimer(id));
    dispatch({
      type: RESET_MEETING,
      payload: id,
    });
  }
);
