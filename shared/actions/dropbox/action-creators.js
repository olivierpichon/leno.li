import dropbox from '../../lib/dropbox'
import * as actions from './actions'

const imageExtensions = ['JPG', 'PNG', 'GIF', 'JPEG', 'PNG']

export const listFolder = ({splat=""}) => (dispatch) => {
  dispatch(actions.updateStore())
  const path = splat.length ? `/${splat}` : ""
  return dropbox.filesListFolder({path})
    .then((response) => {
      const entries = response.entries;
      const folders = entries.filter((file) => {
        return file['.tag'] === 'folder'
      })
      const files = entries.filter((file) => {
        return file['.tag'] === 'file'
      })
      const imgs = files.filter((file) => {
        const extension = file.name.split('.').pop()
        return imageExtensions.includes(extension.toUpperCase())
      })
      const result = { folders, imgs }
      dispatch(actions.listfolderSuccess(result))
      return result
    })
    .catch((error) => {
      dispatch(actions.listfolderFailure(error))
      return Promise.reject(error)
    });
}

export const getPreview = ({path=""}) => (dispatch) => {
  return dropbox.filesDownload({path: path})
    .then((response) => {
      return response.fileBlob
    })
    .catch((error) => {
      dispatch(actions.listfolderFailure(error))
      return Promise.reject(error)
    });
}

