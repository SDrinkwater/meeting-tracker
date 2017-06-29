import {
  ADD_TIMER,
  REMOVE_TIMER,
  REMOVE_TIMER_BY_ID,

  START_TIMER,
  STOP_TIMER,
  RESET_TIMER,
} from '../constants/ActionTypes';

export const addTimer = id => ({
  type: ADD_TIMER,
  id,
});

export const removeTimer = () => ({
  type: REMOVE_TIMER,
});

export const removeTimerById = id => ({
  type: REMOVE_TIMER_BY_ID,
  id,
});

export const startTimer = (id, baseTime = 0) => ({
  type: START_TIMER,
  id,
  baseTime,
  now: new Date().getTime(),
});

export const stopTimer = id => ({
  type: STOP_TIMER,
  id,
  now: new Date().getTime(),
});

export const resetTimer = id => ({
  type: RESET_TIMER,
  id,
  now: new Date().getTime(),
});
