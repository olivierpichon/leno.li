import types from './action-types'

export const listfolderSuccess = (data) => ({
  type: types.listfolder_success,
  payload: {
    data
  }
})

export const listfolderFailure = (data) => ({
  type: types.listfolder_failure,
  payload: {
    error
  }
})

export const updateStore = (data) => ({
  type: types.update_store
})
