import React from 'react';
import './App.css';

import Lock from './Lock.js';

function App() {
  return (
    <Lock passcode='hello' 
      pauseOnCompletedEntry={1000} />
  );
}

export default App;
