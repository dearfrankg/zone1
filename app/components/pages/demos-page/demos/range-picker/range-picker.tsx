"use client";
import React, { useState } from "react";
import { DatePicker, message } from "antd";

/*
  message user when incomplete range
*/

export default function RangePicker() {
  const [selectedRange, setSelectedRange] = useState(null);

  const handleDateChange = (dates: any) => {
    if (dates && dates.length === 2) {
      setSelectedRange(dates);
    } else {
      setSelectedRange(null);
    }
  };

  const handlePickerOpenChange = (open: any) => {
    if (!open && !selectedRange) {
      message.error("Please select a valid range.");
    }
  };

  return (
    <DatePicker.RangePicker
      format="YYYY-MM-DD"
      onChange={handleDateChange}
      onOpenChange={handlePickerOpenChange}
      allowClear={false}
      showTime={false}
      value={selectedRange}
    />
  );
}
