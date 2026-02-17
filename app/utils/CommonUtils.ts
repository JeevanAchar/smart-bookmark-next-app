import { Constants } from "@/app/constant/index";

/**
 * Given a URL string, return the hostname of the URL, or the original URL string if an error occurs.
 * @param {string} url - The URL string to get the hostname from.
 * @returns {string} The hostname of the URL, or the original URL string if an error occurs.
 */
export const getHostname = (url: string) => {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
};

/**
 * Given a saved date string value, return a formatted date string in the medium date style
 * (e.g. "Dec 12, 2022") with the timezone set to UTC. If the value is null or an invalid date,
 * return the string "Recently Labeled".
 * @param {string} [value] - The saved date string value to format.
 * @returns {string} The formatted date string.
 */
export const formatSavedDate = (value?: string) => {
  if (!value) return Constants.CommonConstant.RECENTLY_LABLE;

  const date = new Date(value);
  if (Number.isNaN(date.getTime()))
    return Constants.CommonConstant.RECENTLY_LABLE;

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(date);
};


