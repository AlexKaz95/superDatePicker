import React, { useState } from "react";
import styles from "./styles.module.styl";
import classNames from "classnames";

type ToggleProps = {
  onChange: () => void;
  label: string;
  isRound: boolean;
  setIsRound: React.Dispatch<(prev: any) => boolean>;
};

export const Toggle: React.FC<ToggleProps> = ({ onChange, label, isRound }) => {
  const onClickHandler = () => {
    onChange();
  };
  return (
    <div className={styles.toggle}>
      <div
        className={classNames(styles.wrapper, { [styles.active]: isRound })}
        onClick={onClickHandler}
      >
        <div
          className={classNames(styles.inner, {
            [styles.innerActive]: isRound,
          })}
        ></div>
      </div>
      <div className={styles.label}>{label}</div>
    </div>
  );
};
