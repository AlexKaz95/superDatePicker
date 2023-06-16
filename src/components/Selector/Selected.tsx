import React from "react";
import styles from "./styles.module.styl";
import classNames from "classnames";
import { ArrowDown as ArrowDownIcon } from "../Icons/ArrowDown";

type SelectedProps = {
  openPopUp: (e: React.MouseEvent) => void;
  selected: string;
  minWidth: number;
  className: string;
  isOpen: boolean
};

const Selected: React.FC<SelectedProps> = ({ openPopUp, selected, minWidth, className, isOpen }) => {
  return (
    <div
      onClick={(e) => openPopUp(e)}
      className={classNames(styles.selected, className)}
      style={{ minWidth: `${minWidth}px` }}
    >
      <div>
        {selected}
        <span className={styles.arrow}><ArrowDownIcon width={'10px'}  color={isOpen ? undefined : 'gray'}/></span>
      </div>
    </div>
  );
};

export default Selected;
