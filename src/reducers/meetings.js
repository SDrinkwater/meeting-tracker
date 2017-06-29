import { List, fromJS } from 'immutable';

import {
  ADD_MEETING,
  REMOVE_MEETING,
  REMOVE_MEETING_BY_ID,

  START_MEETING,
  STOP_MEETING,
  RESET_MEETING,
} from '../constants/ActionTypes';

const initialState = List([]);

const meetings = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MEETING:
      return state.push(
        fromJS({
          id: action.id,
          title: 'Meeting',
          play: false,
        }),
      );

    case REMOVE_MEETING: {
      return state.pop();
    }

    case REMOVE_MEETING_BY_ID:
      return state.filter(meeting => meeting.get('id') !== action.id);

    case START_MEETING: {
      const meetingIndex = state.findIndex((meeting => meeting.get('id') === action.id));
      return state.setIn([meetingIndex, 'play'], true);
    }

    case STOP_MEETING:
    case RESET_MEETING: {
      const meetingIndex = state.findIndex((meeting => meeting.get('id') === action.id));
      return state.setIn([meetingIndex, 'play'], false);
    }

    default:
      return state;
  }
};

export default meetings;
