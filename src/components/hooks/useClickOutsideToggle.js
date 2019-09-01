import { useEffect, useRef } from 'react';
import useToggleState from './useToggleState';
const useClickOutsideToggle = () => {
  const ref = useRef();
  const [state, set, toggle] = useToggleState(false);

  useEffect(() => {
    const handleClickOutside = e => {
      console.log('clicking anywhere');
      if (ref.current.contains(e.target)) {
        // inside click
        return;
      }
      // outside click
      toggle();
    };
    if (state) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, state, toggle]);
  return [state, toggle, ref, set];
};

export default useClickOutsideToggle;
