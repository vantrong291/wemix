export const secondToMinuteString = (second) => {
  return Math.floor(second / 60) + ':' + ('0' + Math.floor(second % 60)).slice(-2);
};


