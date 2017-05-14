import { fromJS } from 'immutable';
import types from '../actions/gdrive/action-types'

const defaultState = fromJS({});

export default function GDriveReducer(state = defaultState, { type, payload }) {
  switch(type) {
    case types.get_token_success:
      return state.set('status', 'success')
        .set('authorization', fromJS(payload.data))
    case types.update_store:
      return state.set('status', 'updating')
    default:
      return state;
  }
}
