import { Map, fromJS } from 'immutable';

import {
  ADD_MEETING,
  REMOVE_MEETING_BY_ID,

  START_MEETING,
  STOP_MEETING,
  RESET_MEETING,
} from '../constants/ActionTypes';

const initialState = Map({});

const meetings = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MEETING:
      return state.set(
        action.id,
        fromJS({
          title: 'Meeting',
          play: false,
        }),
      );

    case REMOVE_MEETING_BY_ID:
      return state.remove(action.id);

    case START_MEETING: {
      return state.setIn([action.id, 'play'], true);
    }

    case STOP_MEETING:
    case RESET_MEETING: {
      return state.setIn([action.id, 'play'], false);
    }

    default:
      return state;
  }
};

export default meetings;
