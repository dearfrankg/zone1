import {
  LoginForm,
  Users,
  MockRouter,
  RangePicker,
  InfiniteScroll,
  ReactQueryDemo1,
  React18Batching,
  ParallelQueries,
  Countries,
  IntervalTree,
} from "../demos";

export const collectionFilter = [
  { label: "Nextjs 13", value: "nextjs-13" },
  { label: "React", value: "react" },
  { label: "Tailwind", value: "tailwind" },
  { label: "Tanstack Query", value: "@tanstack/query" },
  { label: "React Testing Library", value: "rtl" },
  { label: "Ant Design Components", value: "antd" },
  { label: "Test Nextjs Router", value: "test-nextjs-router" },
];

export const collection = [
  {
    title: "Infinite Scroll",
    description: "Load an infinite scroller with @tanstack/query",
    component: InfiniteScroll,
    tags: ["nextjs-13", "react", "@tanstack/query", "rtl"],
  },
  {
    title: "Login Form",
    description: "A login form demo that uses antd and tailwind dark mode complete with tests",
    component: LoginForm,
    tags: ["nextjs-13", "react", "tailwind", "rtl", "antd"],
  },
  {
    title: "Mock NextJS Router",
    description: "Tests that mock the nextjs 13 router",
    component: MockRouter,
    tags: ["nextjs-13", "react", "rtl", "test-nextjs-router"],
  },
  {
    title: "RangePicker",
    description: "Using the antd RangePicker to message the user when the range is inalid ",
    component: RangePicker,
    tags: ["nextjs-13", "react", "antd"],
  },
  {
    title: "Manage Blog Posts",
    description: "Query and Mutate blog posts with @tanstack/query",
    component: ReactQueryDemo1,
    tags: ["nextjs-13", "react", "tailwind", "@tanstack/query"],
  },
  {
    title: "Manage Users",
    description: "Using ant components to query and mutate users with @tanstack/query",
    component: Users,
    tags: ["nextjs-13", "react", "@tanstack/query", "antd"],
  },
  {
    title: "React 18 Batching",
    description: "Watch how React 18 batches many set state calls and only renders once",
    component: React18Batching,
    tags: ["nextjs-13", "react"],
  },
  {
    title: "Tanstack Query parallel queries",
    description: "Watch how @tanstack/query run three queries in parellel without extra code",
    component: ParallelQueries,
    tags: ["nextjs-13", "react", "@tanstack/query"],
  },
  {
    title: "Tanstack Query Countries",
    description: "See canonical filtered list using @tanstack/query",
    component: Countries,
    tags: ["nextjs-13", "react", "@tanstack/query"],
  },
  {
    title: "Interval Tree",
    description: "See how an interval tree can optimize searches for time intervals",
    component: IntervalTree,
    tags: ["nextjs-13", "react", "interval-tree"],
  },
];
