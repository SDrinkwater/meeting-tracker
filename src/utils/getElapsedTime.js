const getElapsedTime = (baseTime, startedAt, stoppedAt = new Date().getTime()) => {
  if (!startedAt) {
    return 0;
  }
  return (stoppedAt - startedAt) + baseTime;
};

module.exports = getElapsedTime;
