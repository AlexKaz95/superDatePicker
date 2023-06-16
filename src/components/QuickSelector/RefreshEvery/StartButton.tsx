import React from "react";
import styles from '../styles.module.styl';
import { Play as PlayIcon } from "../../Icons/Play";

type StartButtonProps = {
    onClick: () => void;
};

const StartButton: React.FC<StartButtonProps> = ({onClick}) => {
    return (
        <div
            onClick={onClick}
            className={styles.startButton}
        >
            <span className={styles.playIcon}><PlayIcon width={'10px'}/></span>
            Start
        </div>
    )
};

export default StartButton;