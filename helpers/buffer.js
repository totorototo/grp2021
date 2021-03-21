const createRingBuffer = function (length, initialState = []) {
  /* https://stackoverflow.com/a/4774081 */
  //let pointer = 0;
  let buffer = initialState;
  let pointer =
    initialState.length >= length ? length - 1 : initialState.length;

  const get = (key) => {
    if (key < 0) {
      return buffer[pointer + key];
    } else if (key === false) {
      return buffer[pointer - 1];
    } else {
      return buffer[key];
    }
  };
  const push = (item) => {
    buffer[pointer] = item;
    pointer = (pointer + 1) % length;
    return item;
  };
  const prev = () => {
    const tmp_pointer = (pointer - 1) % length;
    if (buffer[tmp_pointer]) {
      pointer = tmp_pointer;
      return buffer[pointer];
    }
  };
  const next = () => {
    if (buffer[pointer]) {
      pointer = (pointer + 1) % length;
      return buffer[pointer];
    }
  };

  const flush = () => {
    pointer = 0;
    buffer = [];
  };

  const dump = () => {
    return buffer;
  };

  return { get, push, prev, next, flush, dump };
};

export default createRingBuffer;
