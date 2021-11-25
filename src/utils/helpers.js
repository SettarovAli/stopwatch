export const setTimeFormat = (seconds) => {
  const sec = seconds % 60;
  const min = Math.floor(seconds / 60);
  const hours = Math.floor(seconds / 3600);

  const hoursFormat =
    hours < 1 || hours > 23
      ? '00'
      : hours >= 1 && hours <= 9
      ? `0${hours}`
      : `${hours}`;
  const minFormat = min < 10 ? (min === 0 ? '00' : `0${min}`) : `${min}`;
  const secFormant = sec < 10 ? `0${sec}` : `${sec}`;

  return `${hoursFormat}:${minFormat}:${secFormant}`;
};
