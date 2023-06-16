import React from "react";
import { MONTHS } from "../../../constantsOptions";
import styles from '../styles.module.styl';

type MonthTextProps = {
    selectedMonth: number;
    selectedYear: number;
}

export const MonthText: React.FC<MonthTextProps> = ({selectedMonth, selectedYear}) => {
  return (
    <div className={styles.month}>
      {MONTHS[selectedMonth]}{" "}
      <span className={styles.year}>{selectedYear}</span>
    </div>
  );
};
