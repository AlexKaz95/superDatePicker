import React, { ReactNode, useEffect, useRef, useState } from "react";
import styles from "./styles.module.styl";

interface OptionsProps {
  children: ReactNode[];
  onClose: (event: MouseEvent) => void;
  isOpen: boolean;
  minWidth: number;
}

const Options: React.FC<OptionsProps> = ({ isOpen, onClose, children, minWidth }) => {
  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        onClose(event);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside, true);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [isOpen, onClose]);

  return (
    <div ref={optionsRef}>
      {isOpen && <div className={styles.optionsStyle} style={{minWidth: `${minWidth}px`}}>{children}</div>}
    </div>
  );
};

export default Options;
