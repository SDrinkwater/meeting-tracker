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
        action.payload,
        fromJS({
          baseTime: 0,
          startedAt: undefined,
          stoppedAt: undefined,
        }),
      );

    case REMOVE_TIMER_BY_ID:
      return state.remove(action.payload);

    case START_TIMER: {
      const { id, baseTime, now } = action.payload;
      return state.setIn([id, 'baseTime'], baseTime)
        .setIn([id, 'startedAt'], now)
        .setIn([id, 'stoppedAt'], undefined);
    }

    case STOP_TIMER: {
      const { id, now } = action.payload;
      return state.setIn([id, 'stoppedAt'], now);
    }

    case RESET_TIMER: {
      const { id, now } = action.payload;
      const timerToReset = state.get(id);
      return state.setIn([action.id, 'baseTime'], 0)
        .setIn([id, 'startedAt'], timerToReset.startedAt ? now : undefined)
        .setIn([id, 'stoppedAt'], timerToReset.stoppedAt ? now : undefined);
    }

    default:
      return state;
  }
};

export default timers;
