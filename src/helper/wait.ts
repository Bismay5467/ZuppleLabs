const wait = (delayInMS = 1000) =>
  new Promise((resolve) => setTimeout(resolve, delayInMS));

export default wait;
