import React from 'react';
import PropTypes from 'prop-types';

function Key({character, onPress}) {
  if(!onPress) {
    onPress = () => {}
  }

  return (
    <button onClick={() => onPress(character)}>
      {character}
    </button>
  )
}

Key.propTypes = {
  character: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

Key.defaultProps = {
  onClick: () => {}
};

export default Key;