import React from "react";
import styles from "./styles.module.styl";

const Option = ({onClick, value, isSelected}) => {
    return (
        <div 
            className={`${styles.option} ${isSelected ? styles.active : ''}`} 
            onClick={onClick}
        >
            {value}
        </div>
    )
};

export default Option;