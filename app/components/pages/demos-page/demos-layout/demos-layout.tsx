"use client";
import { useState } from "react";
import { Header, Menu } from "/app/components";
import {
  LoginForm,
  Users,
  MockRouter,
  RangePicker,
  InfiniteScroll,
  ReactQueryDemo1,
} from "../demos";

const collection = [
  {
    title: "Infinite Scroll demo",
    description:
      "A demonstration of using react query to load an infinite scroller.",
    component: InfiniteScroll,
  },
  {
    title: "Login Form demo",
    description: "A demo of react, tailwind and antd complete with tests",
    component: LoginForm,
  },
  {
    title: "Mock Router demo",
    description: "A demo of using the nextjs 13 router and how to mock it",
    component: MockRouter,
  },
  {
    title: "RangePicker demo",
    description: "A demo triggering a message when ant RangePicker is invalid",
    component: RangePicker,
  },
  {
    title: "React Query demo1",
    description: "A demo of listing and creating records using a mock api",
    component: ReactQueryDemo1,
  },
  {
    title: "Manage Users demo",
    description:
      "A demo managing users using ant table and modal as well as react-query",
    component: Users,
  },
];

export default function DemosPage() {
  const [index, setIndex] = useState(0);

  const { title, description, component: Component } = collection[index];

  const handleMenuClick = (index: number) => {
    console.log("index: ", index);
    setIndex(index);
  };

  return (
    <div className="flex w-3/4 m-8 p-4 mx-auto border-indigo-500 border-2">
      <div className="w-1/4 p-4">
        <Menu {...{ collection, handleMenuClick }} />
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
