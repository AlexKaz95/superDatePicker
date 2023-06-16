import React, { useReducer, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { TIME_UNITS, TIME_UNITS_DATA } from "../../constantsOptions";
import { createTimeReducer, setDateMS } from "../../reducer/timeReducer";
import { getDateString } from "../../utils/utils";
import { Button } from "../Button";
import DateFields from "../DateFields";
import { Calendar as CalendarIcon } from "../Icons/Calendar";
import { Popover } from "../Popover";
import { QuickSelector } from "../QuickSelector";
import styles from "./styles.module.styl";

const DatePicker: React.FC = () => {
  const nowDate = new Date();
  const nowUnit = TIME_UNITS_DATA[TIME_UNITS[1]].getFromDate(nowDate);
  const [startState, startDispatch] = useReducer(
    ...createTimeReducer({
      dateMS: TIME_UNITS_DATA[TIME_UNITS[1]]
        .setToDate(nowDate, nowUnit - 30)
        .getTime(),
      timeUnit: "minutes",
      relativeTime: 30,
      mode: "last",
      timeMode: "Relative",
    })
  );
  const [endState, endDispatch] = useReducer(
    ...createTimeReducer({
      dateMS: new Date().getTime(),
      timeUnit: "seconds",
      relativeTime: 0,
      mode: "last",
      timeMode: "Now",
    })
  );
  const [error, setError] = useState(false);

  const [isQuickSelectorOpen, setQuickSelectorOpen] = useState(false);
  const uniqId = useRef(uuid());

  const closeQuickSelector = (e: MouseEvent | React.MouseEvent) => {
    e.stopPropagation();
    setQuickSelectorOpen(false);
  };
  const toggleQuickSelector = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickSelectorOpen((prev) => !prev);
  };

  const onClickHandler = () => {
    console.log(getDateString(startState), getDateString(endState));
  };

  const onChangeDateFieldHandler = ({ start, end }) => {
    if (start) startDispatch(setDateMS(start));
    if (end) endDispatch(setDateMS(end));
  };

  return (
    <div className={styles.rgba}>
      <div className={styles.container}>
        <div className={styles.row}>
          <Button onClick={toggleQuickSelector} className={styles.calendarBtn}>
            <CalendarIcon width={"28px"} height={"28px"} />
          </Button>
          <DateFields
            startState={startState}
            startDispatch={startDispatch}
            endState={endState}
            endDispatch={endDispatch}
            onChange={onChangeDateFieldHandler}
            onError={setError}
          />
          <Button onClick={onClickHandler} className={styles.updateBtn}>
            UPDATE
          </Button>
        </div>
        <Popover onClose={closeQuickSelector} isOpen={isQuickSelectorOpen}>
          <QuickSelector
            startDispatch={startDispatch}
            endDispatch={endDispatch}
            uniqId={uniqId.current}
          />
        </Popover>
      </div>
    </div>
  );
};

export default DatePicker;
