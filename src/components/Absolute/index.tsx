import React, { useEffect, useState } from "react";
import { Button } from "../Button";
import { ArrowLeft } from "../Icons/ArrowLeft";
import { ArrowRight } from "../Icons/ArrowRight";
import { DateText } from "./parts/DateText";
import { HoursPicker } from "./parts/HoursPicker";
import { MonthText } from "./parts/MonthText";
import { WeekList } from "./parts/WeekList";
import styles from "./styles.module.styl";
import { CalendarGridPicker } from "./parts/CalendarGridPicker";

type CalendarProps = {
  point: "start" | "end";
  onChange: (dates: { start?: number; end?: number }) => void;
  dateMS: number;
};

export const Calendar: React.FC<CalendarProps> = ({
  point,
  onChange,
  dateMS,
}) => {
  const dateFromMS: Date = new Date(dateMS);
  const [selectedYear, setSelectedYear] = useState<number>(dateFromMS.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(dateFromMS.getMonth());
  const [selectedDay, setSelectedDay] = useState<number>(dateFromMS.getDate());
  const [selectedHours, setSelectedHours] = useState<number>(dateFromMS.getHours());
  const [selectedMinutes, setSelectedMinutes] = useState<number>(dateFromMS.getMinutes());
  const [selectedDate, setSelectedDate] = useState<number>(0);

  useEffect(() => {
    const newDate: Date = new Date();
    setSelectedDate(
      new Date(
        selectedYear,
        selectedMonth,
        selectedDay,
        selectedHours,
        selectedMinutes,
        newDate.getSeconds(),
        newDate.getMilliseconds()
      ).getTime()
    );
  }, [
    selectedHours,
    selectedMinutes,
    selectedDay,
    selectedMonth,
    selectedYear,
  ]);

  useEffect(() => {
    onChange({ [point]: selectedDate });
  }, [selectedDate]);

  const onChangeHoursPickerHandler = (hours: number, minutes: number) => {
    setSelectedHours(hours);
    setSelectedMinutes(minutes);
  };

  const prevDate = () => {
    if (selectedMonth === 0) setSelectedYear((prev) => prev - 1);
    setSelectedMonth((prev) => (prev > 0 ? prev - 1 : 11));
  };

  const nextDate = () => {
    if (selectedMonth === 11) setSelectedYear((prev) => prev + 1);
    setSelectedMonth((prev) => (prev < 11 ? prev + 1 : 0));
  };

  return (
    <div className={styles.container}>
      <div className={styles.calendarWrapper}>
        <div className={styles.calendar}>
          <div className={styles.selectMonth}>
            <Button onClick={prevDate} className={styles.prev}>
              <ArrowLeft />
            </Button>
            <MonthText
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
            />
            <Button onClick={nextDate} className={styles.next}>
              <ArrowRight />
            </Button>
          </div>
          <WeekList />
          <CalendarGridPicker
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            prevDate={prevDate}
            setSelectedDay={setSelectedDay}
            selectedDay={selectedDay}
            nextDate={nextDate}
          />
        </div>
        <HoursPicker dateMS={dateMS} onChange={onChangeHoursPickerHandler} />
      </div>
      <DateText point={point} date={selectedDate} />
    </div>
  );
};
