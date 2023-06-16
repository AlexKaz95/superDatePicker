import React from "react";
import styles from "../styles.module.styl";
import { capitalize, customDateFormatter } from "../../../utils/utils";

export const DateText = ({ point, date }) => (
  <div className={styles.dateWrapper}>
    <span className={styles.title}>{capitalize(point)} date</span>{" "}
    <span className={styles.date}>
      {customDateFormatter(new Date(date))}
    </span>
  </div>
);
