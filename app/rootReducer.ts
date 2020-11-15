import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
// /* eslint import/no-cycle: 0 */
// eslint-disable-next-line import/no-cycle
import counterReducer from './features/counter/counterSlice';
import controlPanelReducer from './features/controlPanel/controlPanelSlice';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    counter: counterReducer,
    controlPanel: controlPanelReducer,
  });
}
