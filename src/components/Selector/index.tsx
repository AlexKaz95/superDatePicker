import classNames from "classnames";
import React, { useEffect, useState } from "react";
import Option from "./Option";
import Options from "./Options";
import Selected from "./Selected";
import styles from "./styles.module.styl";

type OptionType = {
    title: string;
}

type SelectorProps = {
    options: readonly OptionType[];
    defaultValue: string;
    onChange: (selected: string) => void;
    minWidth: number;
}

export const Selector: React.FC<SelectorProps> = ({options, defaultValue, onChange, minWidth}) => {
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const [optionIndex, setOptionIndex] = useState<number>(0);

    const openPopUp = (event: React.MouseEvent<Element, MouseEvent>) => {
        event.stopPropagation();
        setIsPopUpOpen(!isPopUpOpen);
    };
  
    const closePopUp = () => {
        setIsPopUpOpen(false);
    };

    const optionClickHandler = (option: string) => {
        setOptionIndex(options.findIndex((val) => val.title === defaultValue))
        onChange(option);
        closePopUp();
    }

    useEffect(() => {
        setOptionIndex(options.findIndex((val) => val.title === defaultValue))
    }, [defaultValue])
    
    return (
        <div className={styles.selectorWrapper}>
            <Selected 
                openPopUp={openPopUp}
                selected={options[optionIndex].title}
                minWidth={minWidth}
                isOpen={isPopUpOpen}
                className={classNames({[styles.opened]: isPopUpOpen})}
            />
            <Options
                isOpen={isPopUpOpen}
                onClose={closePopUp}
                minWidth={minWidth}
            >
                {options.map((val, indx) => <Option 
                    key={indx} 
                    onClick={() => optionClickHandler(val.title)} 
                    value={val.title} 
                    isSelected={defaultValue===val.title}
                />)}
            </Options>
        </div> 
    )
}
