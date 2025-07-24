export function formatTimePeriod(startDateObj, endDateObj, isOngoing) {
  const options = { year: "numeric", month: "short" }; // e.g., "Sep 2020"

  const startPart =
    startDateObj instanceof Date && !isNaN(startDateObj)
      ? startDateObj.toLocaleString("en-US", options)
      : "";

  if (isOngoing) {
    if (endDateObj instanceof Date && !isNaN(endDateObj)) {
      // If ongoing AND end date is given, add "(expected)"
      const endPart = endDateObj.toLocaleString("en-US", options);
      return `${startPart} - ${endPart} (expected)`;
    } else {
      // If ongoing AND no end date (null), write "Present"
      return `${startPart} - Present`;
    }
  } else {
    // If not ongoing (i.e., completed)
    if (endDateObj instanceof Date && !isNaN(endDateObj)) {
      // If end date is given and valid, format as "start - end"
      const endPart = endDateObj.toLocaleString("en-US", options);
      return `${startPart} - ${endPart}`;
    } else {
      // If end date is NOT given (e.g., null, undefined, invalid date),
      // only return the start date
      return startPart;
    }
  }
}
