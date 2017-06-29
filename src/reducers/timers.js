import { fromJS, Map } from 'immutable';

import {
  ADD_TIMER,
  REMOVE_TIMER_BY_ID,

  START_TIMER,
  STOP_TIMER,
  RESET_TIMER,
} from '../constants/ActionTypes';

const initialState = Map({});

const timers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TIMER:
      return state.set(
        action.id,
        fromJS({
          baseTime: 0,
          startedAt: undefined,
          stoppedAt: undefined,
        }),
      );

    case REMOVE_TIMER_BY_ID:
      return state.remove(action.id);

    case START_TIMER: {
      return state.setIn([action.id, 'baseTime'], action.baseTime)
        .setIn([action.id, 'startedAt'], action.now)
        .setIn([action.id, 'stoppedAt'], undefined);
    }

    case STOP_TIMER: {
      return state.setIn([action.id, 'stoppedAt'], action.now);
    }

    case RESET_TIMER: {
      const timerToReset = state.get(action.id);
      return state.setIn([action.id, 'baseTime'], 0)
        .setIn([action.id, 'startedAt'], timerToReset.startedAt ? action.now : undefined)
        .setIn([action.id, 'stoppedAt'], timerToReset.stoppedAt ? action.now : undefined);
    }

    default:
      return state;
  }
};

export default timers;
