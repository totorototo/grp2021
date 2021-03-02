import { useState, useEffect } from "react";

const usePersistedState = (key, defaultValue) => {
  const [state, setState] = useState();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(key)) || defaultValue;
    setState(data);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (exception) {
      alert(exception);
    }
  }, [key, state]);

  return [state, setState];
};

export default usePersistedState;
