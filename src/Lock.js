import React from 'react';
import PropTypes from 'prop-types';

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

    return (
      <div className='lock'>
        <KeyPad
          characters={characters} 
          length={passcode.length}
          entry={this.state.entry}
          onEntryChanged={this.onEntryChanged} />
      </div>      
    )
  }

  onEntryChanged = (entry) => {
    const { passcode, onSuccess, onFailure, pauseOnCompletedEntry } = this.props;

    this.setState({entry});

    if(entry.length >= passcode.length) {
      setTimeout(() => {
        if(entry === passcode) {
          onSuccess(entry);
        } else {
          onFailure(entry);
          this.setState({entry: ''});
        }
      }, pauseOnCompletedEntry);
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
