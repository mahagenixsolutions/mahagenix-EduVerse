export const formatDate = (date: string | Date, options?: Intl.DateTimeFormatOptions): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return String(date);

  return d.toLocaleDateString(
    'en-US',
    options || { month: 'short', day: 'numeric', year: 'numeric' }
  );
};

export const splitDate = (dateStr: string) => {
  const parts = dateStr.replace(',', '').split(' ');
  if (parts.length >= 2 && Number.isNaN(Number(parts[0]))) {
    return { day: parts[1].padStart(2, '0'), month: parts[0] };
  }
  return { day: (parts[0] || '01').padStart(2, '0'), month: parts[1] || 'Oct' };
};
