import React from 'react';
import PropTypes from 'prop-types';
import Sound from 'react-sound';
import cx from 'classnames';

import KeyPad from './KeyPad';

import './Lock.css';

class Lock extends React.Component {
  constructor(props) {
    super(props);

    this.state = { entry: '' };
  }
  
  render() {
    const { passcode } = this.props;

    const characters = Array
      .from(new Set(Array.from(passcode)))
      .sort();

    const success = this.state.entry === passcode;
    const failure = this.state.entry.length === passcode.length && !success;

    return (
      <div className={cx('lock', { success, failure })}>
        <KeyPad
          characters={characters} 
          length={passcode.length}
          entry={this.state.entry}
          onEntryChanged={this.onEntryChanged} />
        {failure ? <Sound url='failure.mp3' playStatus={Sound.status.PLAYING}/> : null}
      </div>
    );
  }

  onEntryChanged = (entry) => {
    const { passcode, onSuccess, onFailure, pauseOnCompletedEntry } = this.props;

    this.setState({entry});

    if(entry.length >= passcode.length) {
      if(entry === passcode) {
        onSuccess(entry);
      } else {
        setTimeout(() => {
          onFailure(entry);
          this.setState({entry: ''});
        }, pauseOnCompletedEntry);
      }
    }
  }
}

Lock.propTypes = {
  passcode: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  pauseOnCompletedEntry: PropTypes.number.isRequired
};

Lock.defaultProps = {
  onSuccess: () => { },
  onFailure: () => { },
  pauseOnCompletedEntry: 0
};

export default Lock;
