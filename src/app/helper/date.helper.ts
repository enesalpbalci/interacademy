export function addMonthToDate(date: Date, month: number) {
  date.setMonth(date.getMonth() + month);
  return date;
}
