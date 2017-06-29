import { fromJS, List } from 'immutable';

import {
  ADD_TIMER,
  REMOVE_TIMER,
  REMOVE_TIMER_BY_ID,

  START_TIMER,
  STOP_TIMER,
  RESET_TIMER,
} from '../constants/ActionTypes';

const initialState = List([]);

const timers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TIMER:
      return state.push(
        fromJS({
          id: action.id,
          baseTime: 0,
          startedAt: undefined,
          stoppedAt: undefined,
        }),
      );

    case REMOVE_TIMER:
      return state.pop();

    case REMOVE_TIMER_BY_ID:
      return state.filter(timer =>
        timer.get('id') !== action.id,
      );

    case START_TIMER: {
      const timerIndex = state.findIndex(timer => timer.get('id') === action.id);
      return state.setIn([timerIndex, 'baseTime'], action.baseTime)
        .setIn([timerIndex, 'startedAt'], action.now)
        .setIn([timerIndex, 'stoppedAt'], undefined);
    }

    case STOP_TIMER: {
      const timerIndex = state.findIndex(timer => timer.get('id') === action.id);
      return state.setIn([timerIndex, 'stoppedAt'], action.now);
    }

    case RESET_TIMER: {
      const timerIndex = state.findIndex(timer => timer.get('id') === action.id);
      const timerToReset = state.get(timerIndex);
      return state.setIn([timerIndex, 'baseTime'], 0)
        .setIn([timerIndex, 'startedAt'], timerToReset.startedAt ? action.now : undefined)
        .setIn([timerIndex, 'stoppedAt'], timerToReset.stoppedAt ? action.now : undefined);
    }

    default:
      return state;
  }
};

export default timers;
