import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://www.googleapis.com/drive/v3/'
})

export default instance
