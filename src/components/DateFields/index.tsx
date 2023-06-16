import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TimeAction, TimeState } from "../../reducer/timeReducer";
import { DateField } from "./DateField";
import styles from "./styles.module.styl";
import classNames from "classnames";
import { TIME_MODE_UNITS, TIME_UNITS, TIME_UNITS_DATA, msInUnit } from "../../constantsOptions";

type DateFieldProps = {
  onChange: (dates: { start?: number; end?: number }) => void;
  startState: TimeState;
  startDispatch: React.Dispatch<TimeAction>;
  endState: TimeState;
  endDispatch: React.Dispatch<TimeAction>;
  onError: Dispatch<SetStateAction<boolean>>;
};

const getAbsoluteDate = (state: TimeState): number => {
  if (state.timeMode === 'Absolute') {
    return state.dateMS;
  } 
  if (state.timeMode === 'Relative') {
    const sign = state.mode === 'next' ? 1 : -1;
    const nowDate = new Date();
    const nowUnit = TIME_UNITS_DATA[state.timeUnit].getFromDate(nowDate);
    return TIME_UNITS_DATA[state.timeUnit].setToDate(nowDate, nowUnit + sign * state.relativeTime).getTime();
  }
  if (state.timeMode === 'Now') {
    return new Date().getTime();
  }
  return 0
}

const DateFields: React.FC<DateFieldProps> = ({
  onChange,
  startState,
  startDispatch,
  endState,
  endDispatch,
  onError
}) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(getAbsoluteDate(startState) >= getAbsoluteDate(endState))
  }, [startState, endState]);

  useEffect(() => {
    onError(error);
  }, [error])

  return (
    <div className={classNames(styles.container)}>
      <DateField
        point={"start"}
        align={"left"}
        state={startState}
        dispatch={startDispatch}
        onCalendarChange={onChange}
        error={error}
      />

      <DateField
        point={"end"}
        align={"right"}
        state={endState}
        dispatch={endDispatch}
        onCalendarChange={onChange}
        error={error}
      />
    </div>
  );
};

export default DateFields;
