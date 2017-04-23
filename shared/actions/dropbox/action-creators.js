import dropbox from '../../lib/dropbox'
import * as actions from './actions'

const imageExtensions = ['JPG', 'PNG', 'GIF', 'JPEG', 'PNG']

export const listFolder = ({splat=""}) => (dispatch) => {
  dispatch(actions.updateStore())
  const path = splat.length ? `/${splat}` : ""
  return dropbox.filesListFolder({path})
    .then((response) => {
      const entries = response.entries;
      const folders = entries.filter((file) => (file['.tag'] === 'folder'))
      const files   = entries.filter((file) => (file['.tag'] === 'file'))
      const imgs    = files.filter((file) => {
        const extension = file.name.split('.').pop()
        return imageExtensions.includes(extension.toUpperCase())
      })
      const result = { folders, imgs }
      return result
    })
    .then(({folders, imgs}) => {
      const promises = imgs.map(img => getThumbnail(img.path_display, img))
      return Promise.all(promises).then((imgs) => {
        const result = { folders, imgs }
        dispatch(actions.listfolderSuccess(result))
        return result
      })
    })
    .catch((error) => {
      dispatch(actions.listfolderFailure(error))
      return Promise.reject(error)
    });
}

export const getThumbnail = (path, img) => {
  return dropbox.filesGetThumbnail({path: path})
    .then((response) => {
      img.thumbnailBlob = response.fileBlob
      return img
    })
}

