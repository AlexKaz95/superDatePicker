import classNames from "classnames";
import React, { useState } from "react";
import styles from "../styles.module.styl";
import { clockFormatter } from "../../../utils/utils";

type HoursPickerProps = {
  dateMS: number;
  onChange: (hours:number, minutes: number) => void
};

export const HoursPicker: React.FC<HoursPickerProps> = ({
  dateMS,
  onChange
}) => {
  const hoursList = [];
  const date = new Date(dateMS);
  for (let i = 0; i < 24 * 2; i++) {
    hoursList.push({
      hours: Math.floor(i / 2),
      minutes: i % 2 === 0 ? 0 : 30,
      active:
        date.getHours() === Math.floor(i / 2) &&
        (Math.abs(date.getMinutes() - (i % 2 === 0 ? 0 : 30)) < 15 ||
          Math.abs(date.getMinutes() - (i % 2 === 0 ? 0 : 30)) === 0),
    });
  }

  return (
    <div className={styles.hoursPicker}>
      {hoursList.map(({ active, hours, minutes }) => (
        <span
          key={`${hours}-${minutes}`}
          className={classNames(styles.hours, {
            [styles.hoursActive]: active,
          })}
          onClick={() => {
            onChange(hours, minutes)
          }}
        >
          {clockFormatter(hours, minutes)}
        </span>
      ))}
    </div>
  );
};
