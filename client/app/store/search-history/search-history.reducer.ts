import { SearchHistoryState } from './search-history.model';
import { PayloadAction } from '../payload-action';
import { SearchHistoryActions } from './search-history.actions';

export const INITIAL_STATE: SearchHistoryState = {
  loading: true,
  items: [],
  error: null
};

export function searchHistoryReducer(state: SearchHistoryState = INITIAL_STATE, action: PayloadAction) {
  switch (action.type) {
    case SearchHistoryActions.LOAD_SEARCH_HISTORY_STARTED:
      return {
        ...state,
        ...{
          loading: true,
          error: null
        }
      };
    case SearchHistoryActions.LOAD_SEARCH_HISTORY_SUCCEEDED:
      return {
        ...state,
        ...{
          loading: false,
          items: action.payload.data.slice()
        }
      };
    case SearchHistoryActions.LOAD_SEARCH_HISTORY_FAILED:
      return {
        ...state,
        ...{
          loading: false,
          error: action.error
        }
      };
    default:
      return state;
  }
}
