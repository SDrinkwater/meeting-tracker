import * as types from '../constants/ActionTypes';

export const addMeeting = id => ({
  type: types.ADD_MEETING,
  id,
});

export const removeMeeting = () => ({
  type: types.REMOVE_MEETING,
});

export const removeMeetingById = id => ({
  type: types.REMOVE_MEETING_BY_ID,
  id,
});

export const toggleMeeting = id => ({
  type: types.TOGGLE_MEETING,
  id,
});

export const resetMeeting = id => ({
  type: types.RESET_MEETING,
  id,
});
