"use client";

import React, { useState } from "react";
import { Header, Menu } from "@components/index";
import { Select } from "antd";
import { collection, collectionFilter } from "./demo-data";

const splash = {
  title: "Demo Collection",
  description: "A collection of demos that show how to use modern web tools in 2023",
  tags: [],
  component: () => null,
};

interface ItemProps {
  tags: string[];
}

export default function DemosPage() {
  const [menuFilter, setMenuFilter] = useState<string[]>([]);
  const [menuIndex, setMenuIndex] = useState(-1);

  const handleMenuClick = (_menuIndex: number) => {
    setMenuIndex(_menuIndex);
  };

  const handleChangeFilter = (value: string[]) => {
    setMenuIndex(0);
    setMenuFilter(value);
  };

  const filteredCollection = collection.filter((item: ItemProps) => {
    return menuFilter.every((filter: string) => item.tags.includes(filter));
  });

  const { title, description, tags, component: Component } = filteredCollection[Number(menuIndex)] || splash;

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
          <Header {...{ title, description, tags }} />
          <Component />
        </main>
      </div>
    </div>
  );
}
