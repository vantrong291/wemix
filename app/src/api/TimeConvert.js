export const secondToMinuteString = (second) => {
  let i = parseInt(second);
  return Math.floor(i / 60) + ':' + ('0' + Math.floor(i % 60)).slice(-2);
};


