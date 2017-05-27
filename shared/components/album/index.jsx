import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import FolderList from './folder-list'
import ImgList from './img-list'

class Album extends React.Component {
  constructor (props) {
    super(props)
  }

  render() {
    const folders = this.props.gdrive.get('entries').get('folders')
    const imgs    = this.props.gdrive.get('entries').get('imgs')

    return (
      <section id="main">
        <section id="galleries">
          <div className="gallery">
            <header>
              <h1>Gallery</h1>
              <FolderList folders={ folders }/>
            </header>
            <ImgList imgs={ imgs } />
          </div>
        </section>
        <section id="contact"></section>
        <footer id="footer">
          <div class="copyright"></div>
        </footer>
      </section>
    );
  }
}

const mapStateToProps = ({ gdrive }) => ({ gdrive })
export default connect(mapStateToProps, undefined)(Album)
