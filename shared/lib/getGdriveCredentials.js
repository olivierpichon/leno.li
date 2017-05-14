import GoogleAuth from 'google-auth-library'
import * as actions from '../actions/gdrive/actions'

const authFactory = new GoogleAuth()

const scopes = ["https://www.googleapis.com/auth/drive", 
                "https://www.googleapis.com/auth/drive.appdata", 
                "https://www.googleapis.com/auth/drive.file", 
                "https://www.googleapis.com/auth/drive.metadata", 
                "https://www.googleapis.com/auth/drive.metadata.readonly", 
                "https://www.googleapis.com/auth/drive.photos.readonly", 
                "https://www.googleapis.com/auth/drive.readonly"];

const handleError = (err, reject, dispatch) => {
  const error = `Authentication failed because of ${err}`
  dispatch(actions.getTokenFailure(error))
  return reject(error)  
}

const authorize = (dispatch, components, params) => {
  return new Promise((resolve, reject) => {
    authFactory.getApplicationDefault((err, authClient) => {
      if (err) {
        return handleError(err, reject, dispatch)
      }

      if (authClient.createScopedRequired && authClient.createScopedRequired()) {
        authClient = authClient.createScoped(scopes)
        authClient.authorize((err, result) => {
          if (err) {
            return handleError(err, reject)
          }
          dispatch(actions.getTokenSuccess(result))
          return resolve(result)
        })
      }
    })
  });
}

export default authorize
