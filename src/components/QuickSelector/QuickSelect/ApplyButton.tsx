import React, { useContext } from "react";
import styles from "../styles.module.styl";
import { PopUpContext } from "../../Popover";

type ApplyButtonProps = {
  onClick: () => void;
};

export const ApplyButton: React.FC<ApplyButtonProps> = ({ onClick }) => {
  const onClose = useContext(PopUpContext);

  return (
    <div
      onClick={(e) => {
        onClick();
        onClose(e);
      }}
      className={styles.applyButton}
    >
      Apply
    </div>
  );
};

