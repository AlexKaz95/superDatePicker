import React, { useEffect, useState } from "react";
import {
  MODE_OPTIONS,
  MODE_UNITS,
  ModeType,
  TIME_MODE_UNITS,
  TIME_OPTIONS,
  TIME_UNITS,
  TimeUnitType
} from "../../../constantsOptions";
import { TimeAction, setMode, setRelativeTime, setTimeMode, setTimeUnit } from "../../../reducer/timeReducer";
import { InputNumber } from "../../InputNumber";
import { Selector } from "../../Selector";
import styles from "../styles.module.styl";
import { ApplyButton } from "./ApplyButton";

const initialQuickSelect = {};

type QuickSelectProps = {
  startDispatch: React.Dispatch<TimeAction>;
  endDispatch: React.Dispatch<TimeAction>;
  uniqId: string;
};

export const QuickSelect: React.FC<QuickSelectProps> = ({
  startDispatch,
  endDispatch,
  uniqId,
}) => {
  const [selectMode, setSelectedMode] = useState<ModeType>(initialQuickSelect[uniqId]?.selectMode ?? MODE_UNITS[0]);
  const [relativeTime, setInputRelativeTime] = useState<number>(initialQuickSelect[uniqId]?.relativeTime ?? [0]);
  const [timeUnit, setSelectedTimeUnit] = useState<TimeUnitType>(initialQuickSelect[uniqId]?.timeUnit ?? TIME_UNITS[0]);

  const onClickHandler = () => {
    if (selectMode === "last") {
      startDispatch(setRelativeTime(relativeTime));
      startDispatch(setTimeUnit(timeUnit));
      startDispatch(setMode(selectMode));
      startDispatch(setTimeMode("Relative"));
      endDispatch(setTimeMode("Now"));
    } else {
      endDispatch(setRelativeTime(relativeTime));
      endDispatch(setTimeUnit(timeUnit));
      endDispatch(setMode(selectMode));
      endDispatch(setTimeMode("Relative"));
      startDispatch(setTimeMode("Now"));
    }
  };

  useEffect(() => {
    initialQuickSelect[uniqId] = {
      selectModeIndex: selectMode,
      relativeTime,
      timeUnitIndex: timeUnit,
    }
  }, [selectMode, relativeTime, timeUnit])

  return (
    <div className={styles.container}>
      <p className={styles.title}>Quick select</p>
      <div className={styles.row}>
        <Selector
          options={MODE_OPTIONS}
          defaultValue={selectMode}
          minWidth={90}
          onChange={(val: string) => setSelectedMode(val as ModeType)}
        />
        <InputNumber
          value={relativeTime}
          onChange={setInputRelativeTime}
          minWidth={100}
        />
        <Selector
          options={TIME_OPTIONS}
          defaultValue={timeUnit}
          minWidth={120}
          onChange={(val: string) => setSelectedTimeUnit(val as TimeUnitType)}
        />
        <ApplyButton onClick={onClickHandler} />
      </div>
    </div>
  );
};
