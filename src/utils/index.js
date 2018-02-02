import {OrderedMap} from 'immutable';

export function arrayToEntities(values, DataRecord, nameProp = 'id') {
  return values.reduce((acc, value) => acc.set(value[nameProp], new DataRecord(value)), new OrderedMap({}));
}

export function arrayToList(values) {
  return values.reduce((acc, value) => {
    acc.push({...value.toObject()});
    return acc;
  }, []);
}

