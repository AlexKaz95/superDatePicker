import React, { useState } from "react";
import styles from "./styles.module.styl";
import classNames from "classnames";

export const InputNumber = ({ value, onChange, minWidth }) => {
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const newInputValue = event.target.value;

    if (newInputValue < 0) {
      setError("Must be >= 0");
    } else {
      setError("");
      onChange(newInputValue);
    }
  };

  return (
    <div className={styles.inputContainer}>
      <input
        className={classNames({[styles.error]: error})}
        type="number"
        value={value}
        onChange={handleChange}
        onBlur={handleChange}
        style={{ minWidth: `${minWidth}px` }}
      />
      {error && (
        <div className={styles.errorMessage}>{error}</div>
      )}
    </div>
  );
};
