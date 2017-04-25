import Dropbox from 'dropbox'

const dbx = new Dropbox({ accessToken: process.env.DROPBOX_TOKEN })

export default dbx
