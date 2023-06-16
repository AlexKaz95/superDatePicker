import classNames from "classnames";
import React, { useMemo, useState } from "react";
import {
  TIME_MODE_OPTIONS,
  TIME_MODE_UNITS,
  TimeModeType
} from "../../constantsOptions";
import {
  TimeAction,
  TimeState,
  setTimeMode
} from "../../reducer/timeReducer";
import { customDateFormatter } from "../../utils/utils";
import { Calendar } from "../Absolute";
import { Button } from "../Button";
import { NowTab } from "../NowTab";
import { Popover } from "../Popover";
import { Relative } from "../Relative";
import { Tabs } from "../Tabs";
import styles from "./styles.module.styl";

export type DateFieldProps = {
  align: string;
  state: TimeState;
  dispatch: React.Dispatch<TimeAction>;
  onCalendarChange: (dates: { start?: number; end?: number }) => void;
  point: "start" | "end";
  error: boolean;
};

export const DateField: React.FC<DateFieldProps> = ({
  align,
  state,
  dispatch,
  onCalendarChange,
  point,
  error,
}) => {
  const [isOpen, setOpen] = useState(false);

  const getDateString = (state: TimeState) => {
    switch (state.timeMode) {
      case "Absolute":
        return customDateFormatter(new Date(state.dateMS));
      case "Now":
        return "now";
      case "Relative":
        return `~now${state.mode === "last" ? "-" : "+"}${
          state.relativeTime
        } ${state.timeUnit}`;
    }
  };

  const dateString = useMemo(() => getDateString(state), [state]);

  return (
    <div>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        className={"btn"}
      >
        <div
          className={classNames(
            styles.dateField,
            styles[align],
            { [styles.active]: isOpen },
            { [styles.error]: error }
          )}
        >
          {dateString}
        </div>
      </Button>
      <Popover
        onClose={(e) => {
          e.stopPropagation();
          setOpen(false);
        }}
        isOpen={isOpen}
      >
        <Tabs
          titles={TIME_MODE_OPTIONS}
          activeTab={TIME_MODE_UNITS.indexOf(state.timeMode)}
          onChange={(val: string) => dispatch(setTimeMode(val as TimeModeType))}
        >
          <Calendar
            point={point}
            onChange={onCalendarChange}
            dateMS={state.dateMS}
          />
          <Relative state={state} dispatch={dispatch} point={point} />
          <NowTab point={point} dispatch={dispatch} state={state} />
        </Tabs>
      </Popover>
    </div>
  );
};
