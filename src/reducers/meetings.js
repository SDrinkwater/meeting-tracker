import { List, Record } from 'immutable';

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

const initialState = List();
const Meeting = Record({ id: null, title: 'Meeting', play: false, attendees: 1 });

const meetings = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MEETING:
      return state.push(new Meeting({ id: action.payload }));

    case REMOVE_MEETING_BY_ID:
      return state.remove(action.payload);

    case SET_MEETING_TITLE: {
      const { id, title } = action.payload;
      return state.setIn([id, 'title'], title);
    }

    case SET_MEETING_ATTENDEES: {
      const { id, attendees } = action.payload;
      return state.setIn([id, 'attendees'], attendees);
    }

    case MOVE_MEETING: {
      const { oldIndex, newIndex } = action.payload;
      const oldMeeting = state.get(oldIndex);
      return state.delete(oldIndex).insert(newIndex, oldMeeting);
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
