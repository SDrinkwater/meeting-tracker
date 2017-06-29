import { Map, fromJS } from 'immutable';

import {
  ADD_MEETING,
  REMOVE_MEETING_BY_ID,
  SET_MEETING_TITLE,

  START_MEETING,
  STOP_MEETING,
  RESET_MEETING,
} from '../constants/ActionTypes';

const initialState = Map({});
const defaultMeeting = fromJS({ title: 'Meeting', play: false });

const meetings = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MEETING:
      return state.set(
        action.payload,
        defaultMeeting,
      );

    case REMOVE_MEETING_BY_ID:
      return state.remove(action.payload);

    case SET_MEETING_TITLE: {
      const { id, title } = action.payload;
      return state.setIn([id, 'title'], title);
    }

    case START_MEETING: {
      return state.setIn([action.payload, 'play'], true);
    }

    case STOP_MEETING:
    case RESET_MEETING: {
      return state.setIn([action.payload, 'play'], false);
    }

    default:
      return state;
  }
};

export default meetings;
