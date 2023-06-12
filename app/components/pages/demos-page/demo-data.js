import {
  LoginForm,
  Users,
  MockRouter,
  RangePicker,
  InfiniteScroll,
  ReactQueryDemo1,
} from "./demos";

export const collectionFilter = [
  { label: "Nextjs 13", value: "nextjs-13" },
  { label: "React", value: "react" },
  { label: "Tailwind", value: "tailwind" },
  { label: "React Query", value: "react-query" },
  { label: "React Testing Library", value: "rtl" },
  { label: "Ant Design Components", value: "antd" },
  { label: "Test Nextjs Router", value: "test-nextjs-router" },
];

export const collection = [
  {
    title: "Infinite Scroll demo",
    description:
      "A demonstration of using react query to load an infinite scroller.",
    component: InfiniteScroll,
    tags: ["nextjs-13", "react", "react-query", "rtl"],
  },
  {
    title: "Login Form demo",
    description: "A demo of react, tailwind and antd complete with tests",
    component: LoginForm,
    tags: ["nextjs-13", "react", "tailwind", "rtl", "antd"],
  },
  {
    title: "Mock Router demo",
    description: "A demo of using the nextjs 13 router and how to mock it",
    component: MockRouter,
    tags: ["nextjs-13", "react", "rtl", "test-nextjs-router"],
  },
  {
    title: "RangePicker demo",
    description: "A demo triggering a message when ant RangePicker is invalid",
    component: RangePicker,
    tags: ["nextjs-13", "react", "antd"],
  },
  {
    title: "React Query demo1",
    description: "A demo of listing and creating records using a mock api",
    component: ReactQueryDemo1,
    tags: ["nextjs-13", "react", "tailwind", "react-query"],
  },
  {
    title: "Manage Users demo",
    description:
      "A demo managing users using ant table and modal as well as react-query",
    component: Users,
    tags: ["nextjs-13", "react", "react-query", "antd"],
  },
];
