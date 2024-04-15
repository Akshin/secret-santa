/**
 * Generate a time mask based on input value (23:59)
 * @param {string} value
 */
export function timeMask(value: string) {
  const hours = [/[0-2]/, value.charAt(0) === "2" ? /[0-3]/ : /[0-9]/];
  const minutes = [/[0-5]/, /[0-9]/];
  return value.length > 2 ? [...hours, ":", ...minutes] : hours;
}

/**
 * Generate a time range mask based on input value (00:00-23:59)
 * @param {string} value
 */
export function timeRangeMask(value: string) {
  const numbers = value.replace(/[^0-9]/g, "");
  if (numbers.length > 4) {
    return [...timeMask(numbers.substring(0, 4)), "-", ...timeMask(numbers.substring(4))];
  }
  return [...timeMask(numbers)];
}

/**
 * Generate a date mask based on input value (18-04-1991)
 * @param {string} value
 */
export function dateMask(value: string) {
  const numbers = value.replace(/[^0-9]/g, "");

  const days = [/[0-3]/, numbers.charAt(0) === "3" ? /[0-1]/ : /[0-9]/];
  const months = [/[0-1]/, numbers.charAt(2) === "1" ? /[0-2]/ : /[0-9]/];
  const years = [/[0-2]/, /[0-9]/, /[0-9]/, /[0-9]/];

  if (numbers.length > 4) {
    return [...days, "-", ...months, "-", ...years];
  } else if (numbers.length > 2) {
    return [...days, "-", ...months];
  } else {
    return [...days];
  }
}

/**
 * Generate a daterange mask based on input value (18-04-1991 18-04-1991)
 * @param {string} value
 */
export function dateRangeMask(value: string) {
  const numbers = value.replace(/[^0-9]/g, "");

  if (numbers.length > 8) {
    return [...dateMask(numbers.substring(0, 8)), ",", " ", ...dateMask(numbers.substring(8))];
  }

  return [...dateMask(numbers)];
}

/**
 * Generate a datetime mask based on input value (18-04-1991 23:59)
 * @param {string} value
 */
export function dateTimeMask(value: string) {
  const numbers = value.replace(/[^0-9]/g, "");

  if (numbers.length > 8) {
    return [...dateMask(numbers.substring(0, 8)), " ", ...timeMask(numbers.substring(8))];
  }

  return [...dateMask(numbers)];
}

/**
 * Generate a datetime range mask based on input value (18-04-1991 23:59 - 18-04-1991 23:59)
 * @param {string} value
 */
export function dateTimeRangeMask(value: string) {
  const numbers = value.replace(/[^0-9]/g, "");

  if (numbers.length > 12) {
    return [
      ...dateTimeMask(numbers.substring(0, 12)),
      ",",
      " ",
      ...dateTimeMask(numbers.substring(12))
    ];
  }

  return [...dateTimeMask(numbers)];
}
