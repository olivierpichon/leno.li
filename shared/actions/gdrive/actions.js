import types from './action-types'

export const getTokenSuccess = (data) => ({
  type: types.get_token_success,
  payload: {
    data
  }
})

export const getTokenFailure = (error) => ({
  type: types.get_token_failure,
  payload: {
    error
  }
})

export const listfolderSuccess = (data) => ({
  type: types.listfolder_success,
  payload: {
    data
  }
})

export const listfolderFailure = (error) => ({
  type: types.listfolder_failure,
  payload: {
    error
  }
})

export const updateStore = (data) => ({
  type: types.update_store
})
