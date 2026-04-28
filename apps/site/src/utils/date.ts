export function formatTimePeriod(
  startDateObj: Date | null | undefined,
  endDateObj: Date | null | undefined,
  isOngoing: boolean,
): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
  };

  const startPart =
    startDateObj instanceof Date && !isNaN(startDateObj.getTime())
      ? startDateObj.toLocaleString("en-US", options)
      : "";

  if (isOngoing) {
    if (endDateObj instanceof Date && !isNaN(endDateObj.getTime())) {
      const endPart = endDateObj.toLocaleString("en-US", options);
      return `${startPart} - ${endPart} (expected)`;
    } else {
      return `${startPart} - Present`;
    }
  } else {
    if (endDateObj instanceof Date && !isNaN(endDateObj.getTime())) {
      const endPart = endDateObj.toLocaleString("en-US", options);
      return `${startPart} - ${endPart}`;
    } else {
      return startPart;
    }
  }
}

interface DateRange {
  startDate?: Date | null;
  endDate?: Date | null;
}

export function dateListSort(
  datesA: DateRange | null | undefined,
  datesB: DateRange | null | undefined,
): number {
  const endDateA = datesA?.endDate;
  const endDateB = datesB?.endDate;

  if (endDateB === null && endDateA !== null) return 1;
  if (endDateA === null && endDateB !== null) return -1;

  if (endDateA === null && endDateB === null) {
    return (
      (datesB?.startDate?.getTime() ?? 0) - (datesA?.startDate?.getTime() ?? 0)
    );
  }

  return (endDateB?.getTime() ?? 0) - (endDateA?.getTime() ?? 0);
}
