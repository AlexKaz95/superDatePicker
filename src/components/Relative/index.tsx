import React, { useEffect, useMemo, useState } from "react";
import styles from "./styles.module.styl";
import { InputNumber } from "../InputNumber";
import { Selector } from "../Selector";
import {
  MODE_UNITS,
  RELATIVE_TIME_OPTIONS,
  TIME_UNITS,
  TIME_UNITS_DATA,
  msInUnit,
} from "../../constantsOptions";
import { DateText } from "../Absolute/parts/DateText";
import {
  setMode,
  setTimeUnit,
  setRelativeTime,
  setDateMS,
  TimeState,
  TimeAction,
} from "../../reducer/timeReducer";
import { Toggle } from "../Toggle";

type RelativeProps = {
  point: "start" | "end";
  state: TimeState;
  dispatch: React.Dispatch<TimeAction>;
};

export const Relative: React.FC<RelativeProps> = ({
  point,
  state,
  dispatch,
}) => {
  const [timeUnitOption, setTimeUnitOption] = useState<string>(
    RELATIVE_TIME_OPTIONS[0].title
  );
  const [isRound, setIsRound] = useState(false);

  useEffect(() => {
    const diff = new Date().getTime() - state.dateMS;
    console.log(diff)
    const MS_IN_UNITS_ARRAY = Object.entries(msInUnit);

    dispatch(setMode(diff > 0 ? "last" : "next"));

    for (let i = MS_IN_UNITS_ARRAY.length - 1; i != 0; i--) {
      if (Math.abs(diff / MS_IN_UNITS_ARRAY[i][1]) > 1) {

        dispatch(setTimeUnit(TIME_UNITS[i]));
        dispatch(setRelativeTime(Math.abs(Math.round(diff / MS_IN_UNITS_ARRAY[i][1]))));
        break;
      }
    }
  }, []);

  useEffect(() => {
    setIsRound(false);
    RELATIVE_TIME_OPTIONS.forEach(({ unit, mode, title }, indx) => {
      if (state.timeUnit == unit && state.mode == mode) {
        setTimeUnitOption(title);
      }
    });

    const sign = state.mode === "next" ? 1 : -1;
    const nowDate = new Date();
    const nowUnit = TIME_UNITS_DATA[state.timeUnit].getFromDate(nowDate);
    dispatch(
      setDateMS(
        TIME_UNITS_DATA[state.timeUnit]
          .setToDate(nowDate, nowUnit + sign * state.relativeTime)
          .getTime()
      )
    );
  }, [state.timeUnit, state.mode, state.relativeTime]);

  const onChangeInputHandler = (val: number) => dispatch(setRelativeTime(val));
  const onChangeSelectorHandler = (title: string) => {
    setTimeUnitOption(title);
    dispatch(
      setMode(RELATIVE_TIME_OPTIONS.find((val) => val.title === title).mode)
    );
    dispatch(
      setTimeUnit(RELATIVE_TIME_OPTIONS.find((val) => val.title === title).unit)
    );
  };

  const onChangeToggleHandler = () => {
    setIsRound((prev) => !prev);
    const roundedDate =
      Math.round(state.dateMS / msInUnit[state.timeUnit]) *
      msInUnit[state.timeUnit];
    dispatch(setDateMS(roundedDate));
  };

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <InputNumber
          value={state.relativeTime}
          onChange={onChangeInputHandler}
          minWidth={180}
        />
        <Selector
          options={RELATIVE_TIME_OPTIONS}
          defaultValue={timeUnitOption}
          minWidth={180}
          onChange={onChangeSelectorHandler}
        />
      </div>
      <Toggle
        onChange={onChangeToggleHandler}
        isRound={isRound}
        setIsRound={setIsRound}
        label={`Round to the ${state.timeUnit}`}
      />
      <DateText point={point} date={state.dateMS} />
    </div>
  );
};
