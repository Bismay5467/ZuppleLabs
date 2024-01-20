const calculateTimeDifference = (timestamp: number) => {
  const units = [
    ["day", 86400000],
    ["hour", 3600000],
    ["minute", 60000],
    ["second", 1000],
  ];
  const currentTime = Date.now();
  const timeDifference = timestamp - currentTime;
  const absoluteTimeDifference = Math.abs(timeDifference);

  for (const [unit, divisor] of units) {
    const value = Math.floor(absoluteTimeDifference / Number(divisor));
    if (value > 0) {
      const plural = value !== 1 ? "s" : "";
      return timeDifference > 0
        ? `in ~ ${value} ${unit}${plural}`
        : `${value} ${unit}${plural} ago`;
    }
  }

  return "Just now";
};

export default calculateTimeDifference;
