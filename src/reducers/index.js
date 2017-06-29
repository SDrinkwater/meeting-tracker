import { combineReducers } from 'redux';

import meetings from './meetings';
import timers from './timers';

export default combineReducers({
  meetings,
  timers,
});
