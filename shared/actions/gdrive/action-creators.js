import axios from '../../lib/axios'
import * as actions from './actions'

export const listFolder = ({album_id}, {access_token}) => (dispatch) => {
  dispatch(actions.updateStore())
  const folder = album_id ? album_id : 'root'
  return axios.get(`/files?q='${folder}'+in+parents&fields=files(id, name, mimeType, thumbnailLink, webContentLink, imageMediaMetadata)`, { params: { access_token }})
    .then((response) => {
      const entries = response.data.files
      const folders = entries.filter((file) => (file.mimeType === 'application/vnd.google-apps.folder'))
      const pattern = new RegExp(/image*./)
      const imgs    = entries.filter((file) => (pattern.test(file.mimeType))).reverse()
      const result  =  { folders, imgs }
      dispatch(actions.listfolderSuccess(result))
      return result
    })
    .catch((error) => {
      dispatch(actions.listfolderFailure(error))
      return Promise.reject(error)
    });
}
