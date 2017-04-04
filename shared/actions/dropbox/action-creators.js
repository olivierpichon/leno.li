import dropbbox from '../../lib/dropbox'
import * as actions from './actions'

export const listFolder = ({path}) => (dispatch) => {
  return dropbbox.filesListFolder({path: ''})
    .then((response) => {
      let files   = response.entries;
      let folders = files.filter((file) => {
        return file['.tag'] === 'folder';
      });
      dispatch(actions.listfolderSuccess(folders))
      return folders
    })
    .catch((error) => {
      dispatch(actions.listfolderFailure(error))
      return Promise.reject(error)
    });
}
