import {
  ADD_TIMER,
  REMOVE_TIMER_BY_ID,

  START_TIMER,
  STOP_TIMER,
  RESET_TIMER,
} from '../constants/ActionTypes';

export const addTimer = id => ({
  type: ADD_TIMER,
  payload: id,
});

export const removeTimerById = id => ({
  type: REMOVE_TIMER_BY_ID,
  payload: id,
});

export const startTimer = (id, baseTime = 0) => ({
  type: START_TIMER,
  payload: {
    id,
    baseTime,
    now: new Date().getTime(),
  },
});

export const stopTimer = id => ({
  type: STOP_TIMER,
  payload: {
    id,
    now: new Date().getTime(),
  },
});

export const resetTimer = id => ({
  type: RESET_TIMER,
  payload: {
    id,
    now: new Date().getTime(),
  },
});
