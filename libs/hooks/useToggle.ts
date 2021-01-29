import { useState, useCallback } from 'react';

function useToggle(defaultValue: boolean) {
  const [value, setValue] = useState(defaultValue);

  const onToggle = useCallback(() => {
    setValue(!value);
  }, [value]);

  return [value, onToggle] as [boolean, typeof onToggle];
}

export default useToggle;
