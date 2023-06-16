import React, { useState } from "react";
import classNames from "classnames";
import styles from '../styles.module.styl';

type CalendarGridPickerProprs = {
  selectedYear: number;
  selectedMonth: number;
  prevDate: () => void;
  setSelectedDay: React.Dispatch<number>;
  selectedDay: number;
  nextDate: () => void;
};

export const CalendarGridPicker: React.FC<CalendarGridPickerProprs> = ({
  selectedYear,
  selectedMonth,
  selectedDay,
  prevDate,
  nextDate,
  setSelectedDay,
}) => {
  const startWithDay = new Date(selectedYear, selectedMonth, 1).getDay();
  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(selectedYear, selectedMonth, 0).getDate();
  const endWithDay = new Date(
    selectedYear,
    selectedMonth,
    daysInMonth
  ).getDay();

  const calendarDays: React.JSX.Element[] = [];

  for (let day = 0; day < startWithDay; day++) {
    calendarDays.unshift(
      <div
        key={`prev-${daysInPrevMonth - day}`}
        className={styles.additionalDay}
        onClick={() => {
          prevDate();
          setSelectedDay(daysInPrevMonth - day);
        }}
      >
        {daysInPrevMonth - day}
      </div>
    );
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(
      <div
        key={day}
        onClick={() => setSelectedDay(day)}
        className={classNames(styles.day, {
          [styles.activeDay]: day === selectedDay,
        })}
      >
        {day}
      </div>
    );
  }

  for (let day = 1; day < 7 - endWithDay; day++) {
    calendarDays.push(
      <div
        key={`next-${day}`}
        className={styles.additionalDay}
        onClick={() => {
          nextDate();
          setSelectedDay(day);
        }}
      >
        {day}
      </div>
    );
  }

  return <div className={styles.calendarGrid}>{calendarDays}</div>;
};
