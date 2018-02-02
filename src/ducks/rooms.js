import {put, call, takeEvery, take, all} from 'redux-saga/effects';
import {Record, OrderedMap} from 'immutable';
import {arrayToEntities, arrayToList} from '../utils';
import {createSelector} from 'reselect';
import fetchData from '../api';


export const moduleName = 'rooms';

export const FETCH_ALL_REQUEST = `${moduleName}/FETCH_ALL_REQUEST`;
export const FETCH_ALL_START = `${moduleName}/FETCH_ALL_START`;
export const FETCH_ALL_SUCCESS = `${moduleName}/FETCH_ALL_SUCCESS`;
export const FETCH_ALL_ERROR = `${moduleName}/FETCH_ALL_ERRROR`;

export const UPDATE_ROOM_NAME_REQUEST = `${moduleName}/UPDATE_ROOM_NAME_REQUEST`;
export const UPDATE_ROOM_NAME_START = `${moduleName}/UPDATE_ROOM_NAME_START`;
export const UPDATE_ROOM_NAME_SUCCESS = `${moduleName}/UPDATE_ROOM_NAME_SUCCESS`;
export const UPDATE_ROOM_NAME_ERROR = `${moduleName}/UPDATE_ROOM_NAME_ERROR`;

const ReducerState = Record({
  entities: new OrderedMap({}),
  loading: false,
  loaded: false,
  error: null
});

const RoomRecord = Record({
  id: null,
  number: null,
  name: null
});

export default function reducer(state = new ReducerState(), action) {
  const {type, payload} = action;

  switch (type) {
    case FETCH_ALL_START:
      return state
        .set('loading', true)
        .set('loaded', false)
        .set('error', null);
    case FETCH_ALL_SUCCESS:
      return state
        .set('loading', false)
        .set('loaded', true)
        .set('entities', arrayToEntities(payload, RoomRecord));
    case FETCH_ALL_ERROR:
      return state
        .set('loading', false)
        .set('loaded', false)
        .set('error', payload);
    case UPDATE_ROOM_NAME_START:
      return state
        .set('loading', true)
        .set('loaded', false)
        .set('error', null);
    case UPDATE_ROOM_NAME_SUCCESS:
      return state
        .set('loading', false)
        .set('loaded', true)
        .updateIn(['entities', payload.id], () => new RoomRecord(payload));
    case UPDATE_ROOM_NAME_ERROR:
      return state
        .set('loading', false)
        .set('loaded', false)
        .set('error', payload);
    default: return state;
  }
}

export const stateSelector = state => state[moduleName];
export const entitiesSelector = createSelector(stateSelector, state => state.entities);
export const roomsSelector = createSelector(entitiesSelector, entities => entities.valueSeq().toObject());
export const roomsListSelector = createSelector(entitiesSelector, entities => entities.valueSeq().toArray());
export const roomsMenuSelector = createSelector(roomsListSelector, entities => arrayToList(entities));


export function fetchAll() {
  return {
    type: FETCH_ALL_REQUEST
  };
}

export function updateRoomName(room) {
  return {
    type: UPDATE_ROOM_NAME_REQUEST,
    payload: room
  };
}

export function* fetchAllSaga() {
  yield put({
    type: FETCH_ALL_START
  });

  try {
    const fetchRequest = fetchData('roomsApi', 'getRoomsList');
    const response = yield call(fetchRequest);

    yield put({
      type: FETCH_ALL_SUCCESS,
      payload: response
    });
  } catch (error) {
    yield put({
      type: FETCH_ALL_ERROR,
      payload: {error}
    });
  }
}

export function* updateRoomNameSaga() {
  while (true) {
    const action = yield take(UPDATE_ROOM_NAME_REQUEST);

    yield put({
      type: UPDATE_ROOM_NAME_START
    });

    try {
      const {id, name} = action.payload;
      const response = yield call(fetchData('roomsApi', 'updateRoom', {name, id}));

      yield put({
        type: UPDATE_ROOM_NAME_SUCCESS,
        payload: response
      });
    } catch (error) {
      yield put({
        type: UPDATE_ROOM_NAME_ERROR,
        payload: {error}
      });
    }
  }
}

export function* saga() {
  yield all([
    takeEvery(FETCH_ALL_REQUEST, fetchAllSaga),
    updateRoomNameSaga()
  ]);
}
