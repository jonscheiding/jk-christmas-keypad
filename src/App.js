import React from 'react';
import YouTube from 'react-youtube';
import cx from 'classnames';

import './App.css';

import Lock from './Lock.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unlocked: false, 
      opened: false
    };
  }

  render() {
    this.videoRef = React.createRef();

    return (
      <div className='app'>
        <div className={cx({'lock-overlay': true, 'opened': this.state.opened})}>
          <Lock passcode={process.env.REACT_APP_PASSCODE} 
            pauseOnCompletedEntry={1000}
            onSuccess={this.onLockSuccess} />
        </div>
        <div className='content'>
          <YouTube 
            videoId={process.env.REACT_APP_VIDEO_ID} 
            opts={{width: '100%', playerVars: { playsinline: 1 }}}
            onReady={e => this.videoTarget = e.target} />
        </div>
      </div>
    );
  }

  onLockSuccess = () => {
    this.videoTarget.playVideo();
    setTimeout(() => this.setState({opened: true}), 3000);
  }
}

export default App;
