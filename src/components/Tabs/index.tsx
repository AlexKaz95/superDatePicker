import React, { ReactNode, useState } from "react";
import styles from "./styles.module.styl";
import { TIME_MODE_UNITS, TabsOptions } from "../../constantsOptions";

type TabsProps = {
  titles: TabsOptions;
  children: ReactNode[];
  activeTab: number;
  onChange: (val: string) => void;
};

export const Tabs: React.FC<TabsProps> = ({
  titles,
  children,
  activeTab,
  onChange,
}) => {
  const [activeTabLocal, setActiveTabLocal] = useState(activeTab);
  return (
    <div className={styles.tabs}>
      <div className={styles.tabsHeader}>
        {children.map((child, index) => (
          <div
            key={index}
            className={`${styles.tab} ${
              activeTabLocal === index ? styles.active : ""
            }`}
            onClick={() => {
              setActiveTabLocal(index);
              if (titles[TIME_MODE_UNITS[index]].memorable) onChange(TIME_MODE_UNITS[index]);
            }}
          >
            {titles[TIME_MODE_UNITS[index]].title}
          </div>
        ))}
      </div>
      <div className={styles.tabsContent}>{children[activeTabLocal]}</div>
    </div>
  );
};

