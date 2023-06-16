import React, { useContext, useEffect } from "react";
import styles from "./styles.module.styl";
import { PopUpContext } from "../Popover";
import { TIME_MODE_UNITS } from "../../constantsOptions";
import { setDateMS, setRelativeTime, setTimeMode, setTimeUnit } from "../../reducer/timeReducer";

export const NowTab = ({point, dispatch, state}) => {
    const onClose = useContext(PopUpContext);

    const clickHandler = (e) => {
        dispatch(setTimeMode('Now'));
        dispatch(setDateMS(new Date().getTime()));
        dispatch(setRelativeTime(0));
        dispatch(setTimeUnit('seconds'));
        onClose(e);
    }

    useEffect(() => {
        if(TIME_MODE_UNITS[state.timeModeIndex] === 'Now') {return () => dispatch(setDateMS(new Date().getTime()))}
    }, [state.timeModeIndex])

    return(
        <div className={styles.container}>
            <p>Setting the time to "now" means that on every refresh this time will be set to the time of the refresh.</p>
            <button
                className={styles.btn}
                onClick={clickHandler}
            >Set {point} date and time to now</button>
        </div>
    )
}
