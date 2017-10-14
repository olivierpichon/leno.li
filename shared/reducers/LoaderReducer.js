import { fromJS } from 'immutable';
import types from '../actions/loader/action-types'

const defaultState = fromJS({loader: false});

export default function LoaderReducer(state = defaultState, { type, payload }) {
  switch (type) {
    case types.loader_on:
      return state.set('loader', true)
    case types.loader_off:
      return state.set('loader', false)
    default:
      return state
  }
}
