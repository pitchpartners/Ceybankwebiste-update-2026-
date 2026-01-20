import { format } from "date-fns";

export function formatDateWithSuffix(date: Date): string {
  const day = format(date, "d"); // day number
  const monthYear = format(date, "MMMM yyyy"); // Month name + year

  // Determine day suffix
  let suffix = "th";
  const dayNum = parseInt(day);
  if (dayNum % 10 === 1 && dayNum !== 11) suffix = "st";
  else if (dayNum % 10 === 2 && dayNum !== 12) suffix = "nd";
  else if (dayNum % 10 === 3 && dayNum !== 13) suffix = "rd";

  return `${day}${suffix} ${monthYear}`;
}