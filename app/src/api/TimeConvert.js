export const secondToMinuteString = (second) => {
  if (second > 0) {
    let i = parseInt(second);
    return Math.floor(i / 60) + ':' + ('0' + Math.floor(i % 60)).slice(-2);
  }
  return "--:--";
};


