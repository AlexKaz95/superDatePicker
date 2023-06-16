import React, { createContext, useEffect, useRef } from "react";
import styles from "./styles.module.styl";

interface PopoverProps {
  children: React.ReactNode;
  onClose: (event: MouseEvent) => void;
  isOpen: boolean;
}
export const PopUpContext = createContext((e: MouseEvent | React.MouseEvent) => {});

export const Popover: React.FC<PopoverProps> = ({ isOpen, onClose, children }) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
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
    <PopUpContext.Provider value={onClose}>
      <div ref={popoverRef} className={styles.wrapper}>
        {isOpen && <div className={styles.contentStyles}>{children}</div>}
      </div>
    </PopUpContext.Provider>
  );
};

