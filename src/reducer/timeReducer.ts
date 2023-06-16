import { ModeType, TimeModeType, TimeUnitType } from "../constantsOptions";

export type TimeState = {
  dateMS: number;
  timeUnit: TimeUnitType;
  relativeTime: number;
  mode: ModeType;
  timeMode: TimeModeType;
};

const TIME_ACTIONS = [
  "setDateMS",
  "setTimeUnitIndex",
  "setRelativeTime",
  "setModeIndex",
  "setTimeModeIndex",
  "setTimeState"
] as const;

type TimeActionTypes = typeof TIME_ACTIONS[number];

export type TimeAction = {
  type: TimeActionTypes;
  value: any;
}

export const setDateMS = (value: number): TimeAction => ({
  type: "setDateMS",
  value,
});
export const setTimeUnit = (value: TimeUnitType): TimeAction => ({
  type: "setTimeUnitIndex",
  value,
});
export const setRelativeTime = (value: number): TimeAction => ({
  type: "setRelativeTime",
  value,
});
export const setMode = (value: ModeType): TimeAction => ({
  type: "setModeIndex",
  value,
});
export const setTimeMode = (value: TimeModeType): TimeAction => ({
  type: "setTimeModeIndex",
  value,
});
export const setTimeState = (value: TimeState): TimeAction => ({
  type: "setTimeState",
  value,
})

export type TimeReducer = React.Reducer<TimeState, TimeAction>;
export const createTimeReducer = (initState?: TimeState): [TimeReducer, TimeState] => {
  const reducer: TimeReducer = (state, action) => {
    switch (action.type) {
      case "setDateMS":
        return { ...state, dateMS: action.value };
      case "setTimeUnitIndex":
        return { ...state, timeUnit: action.value };
      case "setRelativeTime":
        return { ...state, relativeTime: action.value };
      case "setModeIndex":
        return { ...state, mode: action.value };
      case "setTimeModeIndex":
        return { ...state, timeMode: action.value };
      case "setTimeState":
        return {...action.value}
      default:
        return state;
    }
  };

  const defaultInit: TimeState = {
    dateMS: new Date().getTime(),
    timeUnit: 'seconds',
    relativeTime: 0,
    mode: 'next',
    timeMode: 'Absolute',
  };

  return [reducer, initState ?? defaultInit];
};
