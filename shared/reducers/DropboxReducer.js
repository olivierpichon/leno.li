import { fromJS } from 'immutable';
import types from '../actions/dropbox/action-types'

const defaultState = fromJS({entries: {folders: [], imgs: []}});

export default function DropboxReducer(state = defaultState, { type, payload }) {
  switch(type) {
    case types.listfolder_success:
      return state.set('status', 'success')
        .set('entries', fromJS(payload.data))
    case types.update_store:
      return state.set('status', 'updating')
        .set('entries', fromJS({folders: [], imgs: []}))
    default:
      return state;
  }
}
