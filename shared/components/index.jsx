import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import { listFolder } from '../actions/dropbox/action-creators'

class MainView extends React.Component {
  constructor (props) {
    super(props)
    this.props.listFolder({path: ""}).then((res) => {

    })
  }

  render() {
    return (
      <div id="main-view">
        <h1>LenOli's Website</h1>

        <hr />

      </div>
    );
  }
}

const mapStateToProps = ({ dropbox }) => ({ dropbox })
const mapDispatchToProps = { listFolder }
export default connect(mapStateToProps, mapDispatchToProps)(MainView)
