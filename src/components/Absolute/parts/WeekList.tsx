import React from "react";
import styles from '../styles.module.styl';
import { WEEK } from "../../../constantsOptions";

export const WeekList: React.FC = () => (
    <div className={styles.week}>
        {WEEK.map((day) => (
            <span key={day}>{day}</span>
        ))}
    </div>
)