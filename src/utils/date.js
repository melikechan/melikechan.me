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

export function dateListSort(datesA, datesB) {
  const endDateA = datesA?.endDate;
  const endDateB = datesB?.endDate;

  // B is ongoing (null), A is not -> B comes first
  if (endDateB === null && endDateA !== null) return 1;
  // A is ongoing (null), B is not -> A comes first
  if (endDateA === null && endDateB !== null) return -1;

  // If both are ongoing, sort by start date (descending)
  if (endDateA === null && endDateB === null) {
    return (
      (datesB?.startDate?.getTime() || 0) - (datesA?.startDate?.getTime() || 0)
    );
  }

  // Neither is ongoing, sort by end date (descending)
  return (endDateB?.getTime() || 0) - (endDateA?.getTime() || 0);
}
