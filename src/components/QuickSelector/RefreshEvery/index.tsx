import React from "react";
import styles from "../styles.module.styl";
import {InputNumber} from "../../InputNumber";
import {Selector} from "../../Selector";
import { REFRESH_OPTIONS, REFRESH_UNITS } from "../../../constantsOptions";
import StartButton from "./StartButton";

const RefreshEvery: React.FC = () => {

  return (
    <div className={styles.container}>
      <p className={styles.title}>Refresh every</p>
      <div className={styles.row}>
        <InputNumber
          value={""}
          onChange={() => {}}
          minWidth={150}
        />
        <Selector
          options={REFRESH_OPTIONS}
          defaultValue={REFRESH_OPTIONS[0].title}
          minWidth={130}
          onChange={() => {}}
        />
        <StartButton
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default RefreshEvery;
