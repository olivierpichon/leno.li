import types from '../actions/dropbox/action-types'

export default function DropboxReducer(state = {}, { type, payload }) {
  switch(type) {
    case types.listfolder_success:
      return {
        ...state,
        status: 'success',
        folders: payload.data
      }
    default:
      return state;
  }
}
