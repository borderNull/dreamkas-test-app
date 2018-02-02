import {combineReducers} from 'redux';
import {routerReducer as router} from 'react-router-redux';
import roomsReducer, {moduleName as roomsModule} from '../../ducks/rooms';

export default combineReducers({
  router,
  [roomsModule]: roomsReducer
});
