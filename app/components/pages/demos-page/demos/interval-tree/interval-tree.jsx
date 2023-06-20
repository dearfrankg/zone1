"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Input, Select } from "antd";
import { useComposers } from "./query";
import IntervalTree from "@flatten-js/interval-tree";

const queryClient = new QueryClient();

const { Search } = Input;

const resources = {
  components: {
    Loading: () => <>Loading...</>,

    Errors: ({ error }) => <p>{error?.message}</p>,

    Filters: ({ q, setQ, filterParam, setFilterParam, search, searchCount, totalCount }) => {
      return (
        <div className="w-full border  justify-around ">
          <div className="w-full flex items-center ">
            <section className="flex-1 p-4">
              <div>
                <span className="text-lg font-medium">Composers</span>
              </div>
              <div>
                <span className="text-sm font-medium">{`${searchCount} of ${totalCount}`}</span>
              </div>
            </section>

            <section className="flex-1 flex">
              <Search
                aria-label="Filter Composers By Search String"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="input search text"
                allowClear
                style={{ width: 200, marginRight: 20 }}
              />

              <Select
                aria-label="Filter Composers By Century"
                defaultValue={filterParam}
                onChange={(value) => setFilterParam(value)}
                style={{ width: 200 }}
                options={[
                  { value: "All", label: "All" },
                  { value: "1600", label: "16th century" },
                  { value: "1700", label: "17th century" },
                  { value: "1800", label: "18th century" },
                  { value: "1900", label: "19th century" },
                ]}
              />
            </section>
          </div>
        </div>
      );
    },

    Composers: ({ filteredComposers }) => {
      return (
        <div className="w-full border  justify-around ">
          <ul className="">
            {filteredComposers.map((item) => (
              <li key={item.name} className="flex px-4 py-2">
                <div className="w-1/2">{item.name}</div>
                <div className="w-1/2">{JSON.stringify(item.period, null, 2)}</div>
              </li>
            ))}
          </ul>
        </div>
      );
    },
  },
};

const {
  components: { Loading, Errors, Filters, Composers },
} = resources;

function App() {
  const [q, setQ] = useState("");
  const [filterParam, setFilterParam] = useState("All");

  const { data: composers, isLoading, isError, error } = useComposers();

  if (isError) {
    return <Errors {...{ error }} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const tree = new IntervalTree();

  for (let composer of composers) tree.insert(composer.period, composer.name);

  function search(items) {
    let searchRes = items;

    if (filterParam !== "All") {
      searchRes = tree.search([filterParam - 100, filterParam], (name, period) => ({
        name,
        period: [period.low, period.high],
      }));
    }

    return searchRes.filter((item) => item.name.toLowerCase().includes(q.toLowerCase()));
  }

  const filteredComposers = search(composers);
  const searchCount = filteredComposers.length;
  const totalCount = composers.length;

  return (
    <>
      <Filters {...{ q, setQ, filterParam, setFilterParam, search, searchCount, totalCount }} />
      <Composers {...{ filteredComposers, search }} />
    </>
  );
}

export default function Wrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}
