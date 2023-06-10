"use client";
import React, { useState } from "react";
import { DatePicker, message } from "antd";
import "antd/dist/reset.css";

/*
  message user when incomplete range
*/

const RangeDatePicker = () => {
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
    <div className="w-1/2 h-1/2 m-auto p-8 space-y-8">
      <h1 className="text-2xl font-medium">RangePicker Demo</h1>
      <DatePicker.RangePicker
        format="YYYY-MM-DD"
        onChange={handleDateChange}
        onOpenChange={handlePickerOpenChange}
        allowClear={false}
        showTime={false}
        value={selectedRange}
      />
    </div>
  );
};

export default RangeDatePicker;
