import React from 'react';

import { Input as NativeTextInput } from '@ui-kitten/components';

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style];

  return <NativeTextInput
    error={error}
    style={textInputStyle}
    {...props}
  />;
};

export default TextInput;