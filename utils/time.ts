import {
  parseISO,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  format,
} from "date-fns";

export const calculateTimeDifference = (startTime: string) => {
  const start = parseISO(startTime);
  const now = new Date();
  const minutesDiff = differenceInMinutes(now, start);
  const hoursDiff = differenceInHours(now, start);
  const daysDiff = differenceInDays(now, start);

  if (minutesDiff < 60) {
    return `${minutesDiff}m`;
  } else if (hoursDiff < 24) {
    return format(new Date(0, 0, 0, hoursDiff, minutesDiff % 60), "HH:mm");
  } else {
    const remainingHours = hoursDiff % 24;
    return `${daysDiff}d ${remainingHours}h`;
  }
};
