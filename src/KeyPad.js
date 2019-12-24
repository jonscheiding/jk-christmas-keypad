import React from 'react';
import PropTypes from 'prop-types';

import Key from './Key';

function KeyPad({characters, length, entry, onEntryChanged}) {
  const onPress = (character) => {
    if(entry.length >= length) {
      return;
    };

    onEntryChanged(entry + character);
  };

  let displayedValue = entry;
  while(displayedValue.length < length) {
    displayedValue += '•';
  }

  return(
    <div className='keypad'>
      <input type='text' value={displayedValue} readOnly={true} />
      <div className='keys'>
        {characters.map(c => <Key key={c} character={c} onPress={onPress} />)}
      </div>
    </div>
  );
}

KeyPad.propTypes = {
  length: PropTypes.number.isRequired,
  characters: PropTypes.arrayOf(PropTypes.string).isRequired,
  entry: PropTypes.string.isRequired,
  onEntryChanged: PropTypes.func.isRequired
};

KeyPad.defaultProps = {
  onEntryChanged: () => { },
  entry: ''
};

export default KeyPad;