import React, { PropTypes } from 'react'
import Picture from './img'
import Lightbox from '../../lib/lightbox/Lightbox'
import { setLoader, unsetLoader } from '../../actions/loader/action-creators'
import { connect } from 'react-redux'

class ImgList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentImage: 0,
      lightboxIsOpen: false,
    }
    this.closeLightbox = this.closeLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.gotoImage = this.gotoImage.bind(this);
    this.handleClickImage = this.handleClickImage.bind(this);
    this.hideLoader = this.hideLoader.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
  }

  hideLoader(e) {
    this.props.unsetLoader()
  }

  openLightbox (index, event) {
    event.preventDefault();
    this.props.setLoader()
    this.setState({
      currentImage: index,
      lightboxIsOpen: true,
    });
  }

  getPictureLink(id) {
    const baseUrl      = 'https://www.googleapis.com/drive/v3/files/'
    const access_token = this.props.gdrive.get('authorization').get('access_token')
    const queryParams  = `?alt=media&access_token=${access_token}`
    return `${baseUrl}${id}${queryParams}`
  }

  gotoPrevious () {
    this.props.setLoader()
    this.setState({
      currentImage: this.state.currentImage - 1,
    })
  }
  gotoNext () {
    this.props.setLoader()
    this.setState({
      currentImage: this.state.currentImage + 1,
    })
  }

  gotoImage (index) {
    this.props.setLoader()
    this.setState({
      currentImage: index,
    });
  }

  handleClickImage () {
    if (this.state.currentImage === this.props.images.length - 1) return;

    this.gotoNext();
  }

  closeLightbox () {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }

  render() {
    const imgs = this.props.imgs

    const items = imgs.toJS().map((img) => {
      const imageOrientation = img.imageMediaMetadata ? img.imageMediaMetadata.rotation : 0
      return {
        src: this.getPictureLink(img.id),
        thumbnail: img.thumbnailLink,
        imageClass: `orientation${imageOrientation}`
      }
    })
    //const items = [{ src: '/1.jpeg'}, {src: '/2.jpg'}]
    return (
      <div className="content">
        {imgs.map((img, i) => (
          <Picture img={img} key={img.get('id')} openLightBox={this.openLightbox} imgIndex={i} />
        ))}
        <Lightbox
          images={items}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          onClickImage={this.handleClickImage}
          onClickThumbnail={this.gotoImage}
          onClose={this.closeLightbox}
          preloadNextImage={true}
          showThumbnails={true}
          onImageLoad={this.hideLoader}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ gdrive, loader }) => ({ gdrive, loader })
const mapDispatchToProps = { setLoader, unsetLoader }
export default connect(mapStateToProps, mapDispatchToProps)(ImgList)
