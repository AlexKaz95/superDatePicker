import {
  MODE_UNITS,
  MONTHS,
  TIME_MODE_UNITS,
  TIME_UNITS,
} from "../constantsOptions";
import { TimeState } from "../reducer/timeReducer";

export const getDaysInMonth = (year, month) => {
  const date = new Date(year, month, 1);
  date.setMonth(date.getMonth() + 1);
  date.setDate(date.getDate() - 1);
  return date.getDate();
};

export const customDateFormatter = (date) =>
  `${MONTHS[date.getMonth()].slice(0, 3)} ${date.getDate()}, ${date.getFullYear()} @ ${timeFormatter(date)}`;

export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const getDateString = (state: TimeState) => {
  switch (TIME_MODE_UNITS[state.timeMode]) {
    case "Absolute":
      return new Date(state.dateMS).toISOString();
    case "Now":
      return "now";
    case "Relative":
      return `now${MODE_UNITS[state.mode] === "last" ? "-" : "+"}${
        state.relativeTime
      }${TIME_UNITS[state.timeUnit].slice(0, 1)}`;
  }
};

export const timeFormatter = (date) => {
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const seconds =
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
  return `${hours}:${minutes}:${seconds}.${date.getMilliseconds()}`;
};

export const clockFormatter = (hours, minutes) => {
  return `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;
};
