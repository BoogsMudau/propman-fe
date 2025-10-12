import { format, isToday, isYesterday } from 'date-fns';

const formatTimestamp = (timestamp: string | Date) => {
  const date = new Date(timestamp);

  if (isToday(date)) {
    return format(date, 'HH:mm'); // 14:32
  } else if (isYesterday(date)) {
    return `Yesterday ${format(date, 'HH:mm')}`; // Yesterday 14:32
  } else {
    return format(date, 'dd/MM/yyyy HH:mm'); // 13/09/2025 14:32
  }
};

const formatDay = (timestamp: string | Date) => {
  const date = new Date(timestamp);
  return format(date, 'dd-MM-yyyy');
};

export { formatTimestamp, formatDay };
