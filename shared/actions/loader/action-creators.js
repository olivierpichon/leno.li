import * as actions from './actions'

export const setLoader = () => (dispatch) => {
  dispatch(actions.setLoader)
}


export const unsetLoader = () => (dispatch) => {
  dispatch(actions.unsetLoader)
}
