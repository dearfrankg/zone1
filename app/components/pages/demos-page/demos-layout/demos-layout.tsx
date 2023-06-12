"use client";
import { useState } from "react";
import { Header, Menu } from "/app/components";
import { collection, collectionFilter } from "./demo-data";
import { Select } from "antd";

const splash = {
  title: "Demo Collection",
  description:
    "A collection of demos that show how to modern web tools in 2023",
  component: () => null,
};

export default function DemosPage() {
  const [menuFilter, setMenuFilter] = useState([]);
  const [menuIndex, setMenuIndex] = useState(-1);

  const handleMenuClick = (menuIndex: number) => {
    setMenuIndex(menuIndex);
  };

  const handleChangeFilter = (value: any) => {
    setMenuIndex(0);
    setMenuFilter(value);
  };

  const filteredCollection = collection.filter((item: any) => {
    return menuFilter.every((filter: any) => item.tags.includes(filter));
  });

  const {
    title,
    description,
    component: Component,
  } = filteredCollection[menuIndex] || splash;

  return (
    <div className="flex w-3/4 m-8 p-4 mx-auto border-indigo-500 border-2">
      <div className="w-1/4 p-4 space-y-4">
        <Select
          mode="multiple"
          allowClear
          className="w-full"
          placeholder="Menu filter"
          defaultValue={menuFilter}
          onChange={handleChangeFilter}
          options={collectionFilter}
        />
        <Menu {...{ collection: filteredCollection, handleMenuClick }} />
      </div>
      <div className="w-3/4 p-4">
        <main className="w-3/4 mx-auto p-8 ">
          <Header {...{ title, description }} />
          <Component />
        </main>
      </div>
    </div>
  );
}
