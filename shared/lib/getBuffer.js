import { Buffer } from 'buffer/'
import toBuffer from 'blob-to-buffer'

export default (response) => {
  const promise = new Promise((resolve) => {
    if (response.fileBinary) {
      return resolve(new Buffer(response.fileBinary, 'binary'))
    } else {
      toBuffer(response.fileBlob, (err, buffer) => {
        return resolve(buffer)
      })
    }
  })
  return promise
}
