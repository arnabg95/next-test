export function timeAgo(hours: number): string {
  // Define constants for conversions
  const MINUTES_IN_HOUR = 60;
  const HOURS_IN_DAY = 24;
  const DAYS_IN_WEEK = 7;
  const DAYS_IN_MONTH = 30; // Approximation for months
  const DAYS_IN_YEAR = 365; // Approximation for years

  // Determine the appropriate unit and value
  let value: number;
  let unit: string;

  if (hours < 1) {
    // Less than an hour: convert to minutes
    value = Math.round(hours * MINUTES_IN_HOUR);
    unit = "min";
  } else if (hours < HOURS_IN_DAY) {
    // Less than a day: use hours
    value = Math.round(hours);
    unit = "hour";
  } else if (hours < HOURS_IN_DAY * DAYS_IN_WEEK) {
    // Less than a week: convert to days
    value = Math.round(hours / HOURS_IN_DAY);
    unit = "day";
  } else if (hours < HOURS_IN_DAY * DAYS_IN_MONTH) {
    // Less than a month: convert to weeks
    value = Math.round(hours / (HOURS_IN_DAY * DAYS_IN_WEEK));
    unit = "week";
  } else if (hours < HOURS_IN_DAY * DAYS_IN_YEAR) {
    // Less than a year: convert to months
    value = Math.round(hours / (HOURS_IN_DAY * DAYS_IN_MONTH));
    unit = "month";
  } else {
    // A year or more: convert to years
    value = Math.round(hours / (HOURS_IN_DAY * DAYS_IN_YEAR));
    unit = "year";
  }

  // Handle pluralization
  const plural = value !== 1 ? "s" : "";

  return `${value} ${unit}${plural} ago`;
}

export function timeAgoFromCreation(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 1) {
    return `${years} years ago`;
  } else if (years === 1) {
    return "1 year ago";
  } else if (months > 1) {
    return `${months} months ago`;
  } else if (months === 1) {
    return "1 month ago";
  } else if (days > 1) {
    return `${days} days ago`;
  } else if (days === 1) {
    return "1 day ago";
  } else if (hours > 1) {
    return `${hours} hours ago`;
  } else if (hours === 1) {
    return "1 hour ago";
  } else if (minutes > 1) {
    return `${minutes} minutes ago`;
  } else if (minutes === 1) {
    return "1 minute ago";
  } else {
    return `${seconds} seconds ago`;
  }
}
