const timeStringBetweenDates = (date1, date2) => {
  const differenceInMs = date2.getTime() - date1.getTime();

  const differenceInSeconds = differenceInMs / 1000;

  let timeSpanString = '';
  switch (true) {
    case differenceInSeconds < 10:
      timeSpanString = 'Just now 👍';
      break;
    case differenceInSeconds < 60:
      timeSpanString = `${Math.floor(
        differenceInSeconds,
      )} seconds ago`;
      break;
    case differenceInSeconds < 120:
      timeSpanString = `Less than 2 minutes ago`;
      break;
    case differenceInSeconds >= 120 && differenceInSeconds < 6000:
      timeSpanString = `${Math.floor(
        differenceInSeconds / 60,
      )} minutes ago`;
      break;
    case differenceInSeconds >= 6000:
      timeSpanString = `Too long ago... 😫`;
      break;
    default:
      timeSpanString = '';
      break;
  }
  return timeSpanString;
};

export default timeStringBetweenDates;
