import {all} from 'redux-saga/effects';
import {saga as roomsSaga} from '../ducks/rooms';

export default function* () {
  yield all([
    roomsSaga()
  ]);
}
