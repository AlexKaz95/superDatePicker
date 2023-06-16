import React, { useContext } from "react";
import styles from "../styles.module.styl";
import { COMMONLY_USED_OPTIONS, COMMONLY_USED_UNITS } from "../../../constantsOptions";
import { PopUpContext } from "../../Popover";
import { TimeAction, setTimeState } from "../../../reducer/timeReducer";

type CommonlyUsedProps = {
  startDispatch: React.Dispatch<TimeAction>;
  endDispatch: React.Dispatch<TimeAction>;
}

export const CommonlyUsed: React.FC<CommonlyUsedProps> = ({
  startDispatch,
  endDispatch
}) => {
  const onClose = useContext(PopUpContext);
  const onClickHandle = (e, link) => {
    e.preventDefault();
    const [startState, endState] = COMMONLY_USED_OPTIONS[link].getPeriod();
    startDispatch(setTimeState(startState));
    endDispatch(setTimeState(endState));
    onClose(e);
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>Commonly used</p>
      <div className={styles.linkWrapper}>
      {COMMONLY_USED_UNITS.map((link) => (
        <a
          className={styles.link}
          href="#"
          key={link}
          onClick={(e) => onClickHandle(e, link)}
        >
          {link}
        </a>
      ))}
      </div>
    </div>
  );
};

