import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { listFolder } from '../../actions/gdrive/action-creators'
import FolderList from './folder-list'
import ImgList from './img-list'

class Album extends React.Component {
  constructor (props) {
    super(props)
  }

  static needs = [
    listFolder
  ];

  render() {
    const folders = this.props.gdrive.get('entries').get('folders')
    const imgs    = this.props.gdrive.get('entries').get('imgs')

    return (
      <section id="galleries">
        <div className="gallery">
          <header>
            <h1>Gallery</h1>
          </header>
          <FolderList folders={ folders }/>
          <ImgList imgs={ imgs } />
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({ gdrive }) => ({ gdrive })
const mapDispatchToProps = { listFolder }
export default connect(mapStateToProps, mapDispatchToProps)(Album)
