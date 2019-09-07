import { DATA_SOURCES, DataSourceData } from './data-source.data';
import { PayloadAction } from '../payload-action';
import { DataSourceActions } from './data-source.actions';
import { combineReducers } from 'redux';

export const INITIAL_STATE: DataSourceData = {
  loading: true,
  items: [],
  error: null
};

export let dataSourceReducer = combineReducers({
  [DATA_SOURCES.ENTITY]: createDataSourceReducer(DATA_SOURCES.ENTITY),
  [DATA_SOURCES.ROLE]: createDataSourceReducer(DATA_SOURCES.ROLE),
});

export function createDataSourceReducer(type: string) {
  return function dataSourceReduces(state: DataSourceData = INITIAL_STATE, action: PayloadAction) {
    if (!action.meta || action.meta !== type) {
      return state;
    }
    switch (action.type) {
      case DataSourceActions.LOAD_STARTED: {
        return {
          ...state,
          ...{
            loading: true,
            error: null
          }
        };
      }
      case DataSourceActions.LOAD_SUCCEEDED: {
        return {
          ...state,
          ...{
            loading: false,
            items: action.payload
          }
        };
      }
      case DataSourceActions.LOAD_FAILED: {
        return {
          ...state,
          ...{
            loading: false,
            error: action.error
          }
        };
      }
      default:
        return state;
    }
  };
}
