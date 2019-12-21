import React from 'react';
import cx from 'classnames';

import './App.css';

import Lock from './Lock.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {unlocked: false}
  }
  
  render() {
    return (
      <div className='app'>
        <div className={cx({'lock-overlay': true, 'unlocked': this.state.unlocked})}>
          <Lock passcode='HELLO' 
            pauseOnCompletedEntry={1000}
            onSuccess={this.unlock} />
        </div>
        <div className='content'>
          YOU WIN!
        </div>
      </div>
    );
  }

  unlock = () => {
    this.setState({unlocked: true});
  }
}

export default App;
