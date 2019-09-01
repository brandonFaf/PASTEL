import { useState } from 'react';

const useToggleState = initialState => {
  const [state, set] = useState(initialState);
  const toggle = () => {
    set(!state);
  };
  return [state, set, toggle];
};

export default useToggleState;
