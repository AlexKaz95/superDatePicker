import { TimeState } from "./reducer/timeReducer";

export const MODE_UNITS = ["next", "last"] as const;
export const WEEK = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
export const TIME_UNITS = [
  "seconds",
  "minutes",
  "hours",
  "days",
  "weeks",
  "month",
  "years",
] as const;

export const REFRESH_UNITS = ["seconds", "minutes", "hours"] as const;

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const TIME_MODE_UNITS = ["Absolute", "Relative", "Now"] as const;

export type ModeType = typeof MODE_UNITS[number];

export type ModeOptionType = {
  title: string;
  mode: ModeType;
};

export const MODE_OPTIONS: readonly ModeOptionType[] = MODE_UNITS.map((unit) => ({
  title: unit,
  mode: unit,
}));

export type TimeUnitsType = typeof TIME_UNITS;
export type TimeUnitType = TimeUnitsType[number];

export type TimeOption = {
  title: string;
  mode?: ModeType;
  unit: TimeUnitType;
};

export const TIME_OPTIONS: readonly TimeOption[] = TIME_UNITS.map((unit) => ({
  title: `${unit}`,
  unit: unit,
}));

export const AGO_TIME_OPTIONS: readonly TimeOption[] = TIME_UNITS.map(
  (unit) => ({
    title: `${unit} ago`,
    mode: "last",
    unit: unit,
  })
);

export const FROM_NOW_TIME_OPTIONS: readonly TimeOption[] = TIME_UNITS.map(
  (unit) => ({
    title: `${unit} from now`,
    mode: "next",
    unit: unit,
  })
);

export const msInUnit: Record<TimeUnitType, number> = {
  seconds: 1000,
  minutes: 60000,
  hours: 3600000,
  days: 86400000,
  weeks: 604800000,
  month: 2592000000,
  years: 31104000000,
};

export type TimeUnitData = {
  msIn: number;
  getFromDate: (date: Date) => number;
  setToDate: (date: Date, value: number) => Date;
  abbr: string;
  title: string;
  multipleTitle: string;
}

export const TIME_UNITS_DATA: Record<TimeUnitType, TimeUnitData> = {
  seconds: {
    msIn: 1000,
    getFromDate: (date: Date) => date.getSeconds(),
    setToDate: (date: Date, value: number) => {date.setSeconds(value); return date},
    abbr: 's',
    title: 'second',
    multipleTitle: 'seconds',
  },
  minutes: {
    msIn: 60000,
    getFromDate: (date: Date) => date.getMinutes(),
    setToDate: (date: Date, value: number) => {date.setMinutes(value); return date},
    abbr: 'm',
    title: 'minute',
    multipleTitle: 'minutes',
  },
  hours: {
    msIn: 3600000,
    getFromDate: (date: Date) => date.getHours(),
    setToDate: (date: Date, value: number) => {date.setHours(value); return date},
    abbr: 'h',
    title: 'hour',
    multipleTitle: 'hours',
  },
  days: {
    msIn: 86400000,
    getFromDate: (date: Date) => date.getDate(),
    setToDate: (date: Date, value: number) => {date.setDate(value); return date},
    abbr: 'd',
    title: 'day',
    multipleTitle: 'days',
  },
  weeks: {
    msIn: 604800000,
    getFromDate: (date: Date) => date.getDate() / 7,
    setToDate: (date: Date, value: number) => {date.setDate(value * 7); return date},
    abbr: 'w',
    title: 'week',
    multipleTitle: 'weeks',
  },
  month: {
    msIn: 2592000000,
    getFromDate: (date: Date) => date.getMonth(),
    setToDate: (date: Date, value: number) => {date.setMonth(value); return date},
    abbr: 'M',
    title: 'month',
    multipleTitle: 'months',
  },
  years: {
    msIn: 31104000000,
    getFromDate: (date: Date) => date.getFullYear(),
    setToDate: (date: Date, value: number) => {date.setFullYear(value); return date},
    abbr: 'y',
    title: 'year',
    multipleTitle: 'years',
  }
}

export const COMMONLY_USED_UNITS = [
  "Today",
  "This week",
  "This month",
  "This year",
  "Yesterday",
  "Week to date",
  "Month to date",
  "Year to date",
] as const;

export type CommonlyUsedUnits = typeof COMMONLY_USED_UNITS[number]
export type CommonlyUsedOption = {
  getPeriod: () => [TimeState, TimeState];
}

export const COMMONLY_USED_OPTIONS: Record<CommonlyUsedUnits, CommonlyUsedOption> = {
  Today: {
    getPeriod(){
      const dateNow = new Date();
      const startState: TimeState = {
        dateMS: new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate()).getTime(),
        timeUnit: "hours",
        relativeTime: dateNow.getHours(),
        mode: "last",
        timeMode: "Relative"
      }
      const endState: TimeState = {
        dateMS: new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate()+1).getTime(),
        timeUnit: "hours",
        relativeTime: 24-dateNow.getHours(),
        mode: "next",
        timeMode: "Relative"
      }
      return [startState, endState]
    }
  },
  "This week": {
    getPeriod(){
      const dateNow = new Date();
      const startState: TimeState = {
        dateMS: new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate()-dateNow.getDay()+1).getTime(),
        timeUnit: "days",
        relativeTime: dateNow.getDay(),
        mode: "last",
        timeMode: "Relative"
      }
      const endState: TimeState = {
        dateMS: new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate() + 6 - dateNow.getDay()+1).getTime(),
        timeUnit: "days",
        relativeTime: 6-dateNow.getDay(),
        mode: "next",
        timeMode: "Relative"
      }
      return [startState, endState]
    }
  },
  "This month": {
    getPeriod(){
      const dateNow = new Date();
      const startState: TimeState = {
        dateMS: new Date(dateNow.getFullYear(), dateNow.getMonth(), 1).getTime(),
        timeUnit: "days",
        relativeTime: dateNow.getDate()-1,
        mode: "last",
        timeMode: "Relative"
      }

      const daysInMonth = new Date(dateNow.getFullYear(), dateNow.getMonth() + 1, 0).getDate();
      const endState: TimeState = {
        dateMS: new Date(dateNow.getFullYear(), dateNow.getMonth(), daysInMonth).getTime(),
        timeUnit: "days",
        relativeTime: daysInMonth-dateNow.getDate(),
        mode: "next",
        timeMode: "Relative"
      }
      return [startState, endState]
    }
  },
  "This year": {
    getPeriod(){
      const dateNow = new Date();
      const startState: TimeState = {
        dateMS: new Date(dateNow.getFullYear()).getTime(),
        timeUnit: "month",
        relativeTime: dateNow.getMonth(),
        mode: "last",
        timeMode: "Relative"
      }
      const endState: TimeState = {
        dateMS: new Date(dateNow.getFullYear()+1).getTime() - 1,
        timeUnit: "month",
        relativeTime: 12-dateNow.getMonth(),
        mode: "next",
        timeMode: "Relative"
      }
      return [startState, endState]
    }
  },
  Yesterday: {
    getPeriod(){
      const dateNow = new Date();
      const startState: TimeState = {
        dateMS: new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate()-1).getTime(),
        timeUnit: "hours",
        relativeTime: dateNow.getHours() + 24,
        mode: "last",
        timeMode: "Relative"
      }
      const endState: TimeState = {
        dateMS: new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate()).getTime() - 1,
        timeUnit: "hours",
        relativeTime: dateNow.getHours(),
        mode: "last",
        timeMode: "Relative"
      }
      return [startState, endState]
    }
  },
  "Week to date": {
    getPeriod(){
      const dateNow = new Date();
      const startState: TimeState = {
        dateMS: new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate() - 7).getTime(),
        timeUnit: "weeks",
        relativeTime: 1,
        mode: "last",
        timeMode: "Relative"
      }
      const endState: TimeState = {
        dateMS: dateNow.getTime(),
        timeUnit: "seconds",
        relativeTime: 0,
        mode: "next",
        timeMode: "Now"
      }
      return [startState, endState]
    }
  },
  "Month to date": {
    getPeriod(){
      const dateNow = new Date();
      const startState: TimeState = {
        dateMS: new Date(dateNow.getFullYear(), dateNow.getMonth()-1, dateNow.getDate()).getTime(),
        timeUnit: "month",
        relativeTime: 1,
        mode: "last",
        timeMode: "Relative"
      }
      const endState: TimeState = {
        dateMS: dateNow.getTime(),
        timeUnit: "seconds",
        relativeTime: 0,
        mode: "next",
        timeMode: "Now"
      }
      return [startState, endState]
    }
  },
  "Year to date": {
    getPeriod(){
      const dateNow = new Date();
      const startState: TimeState = {
        dateMS: new Date(dateNow.getFullYear()-1, dateNow.getMonth(), dateNow.getDate()).getTime(),
        timeUnit: "years",
        relativeTime: 1,
        mode: "last",
        timeMode: "Relative"
      }
      const endState: TimeState = {
        dateMS: dateNow.getTime(),
        timeUnit: "seconds",
        relativeTime: 0,
        mode: "next",
        timeMode: "Now"
      }
      return [startState, endState]
    }
  }
}

export type RefreshUnitsType = typeof REFRESH_UNITS;
export type RefreshUnitType = RefreshUnitsType[number];

export type RefreshOption = {
  title: string;
  unit: RefreshUnitType;
};

export const REFRESH_OPTIONS: readonly RefreshOption[] = REFRESH_UNITS.map((unit) => ({
  title: unit,
  unit: unit,
}));


export type TimeModeType = typeof TIME_MODE_UNITS[number];
export const TIME_MODE_OPTIONS: Record<TimeModeType, {title: string, memorable: boolean}> = {
  Absolute: {
    title: "Absolute",
    memorable: true
  },
  Relative: {
    title: "Relative",
    memorable: true
  },
  Now: {
    title: "Now",
    memorable: false
  }
} as const;

export type TabsOptions = typeof TIME_MODE_OPTIONS;
export const RELATIVE_TIME_OPTIONS = [...AGO_TIME_OPTIONS, ...FROM_NOW_TIME_OPTIONS];