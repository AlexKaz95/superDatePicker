import React from "react";
import styles from '../styles.module.styl';
type RecentlyUsedProps = {
    list: string[]
};

export const RecentlyUsed: React.FC<RecentlyUsedProps> = ({ list }) => {
    
    return list.length > 0 && (
        <div className={styles.container}>
            <p className={styles.title}>Recently used</p>    
        </div>
    );
}