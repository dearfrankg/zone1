"use client";

import "./index.css";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCountryQuery } from "./query";
import { Input, Select } from "antd";

const queryClient = new QueryClient();

const { Search } = Input;

const resources = {
  components: {
    Loading: () => <>Loading...</>,

    Errors: ({ error }: any) => <p>{error?.message}</p>,

    Filters: ({ q, setQ, filterParam, setFilterParam, search, searchCount, totalCount }: any) => {
      return (
        <div className="w-full border  justify-around ">
          <div className="w-full flex items-center ">
            <section className="flex-1 p-4">
              <div>
                <span className="text-lg font-medium">Countries</span>
              </div>
              <div>
                <span className="text-sm font-medium">{`${searchCount} of ${totalCount}`}</span>
              </div>
            </section>

            <section className="flex-1 flex">
              <Search
                aria-label="Filter Countries By Search String"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="input search text"
                allowClear
                style={{ width: 200, marginRight: 20 }}
              />

              <Select
                aria-label="Filter Countries By Region"
                defaultValue={filterParam}
                onChange={(value) => setFilterParam(value)}
                style={{ width: 200 }}
                options={[
                  { value: "All", label: "Filter By Region" },
                  { value: "Africa", label: "Africa" },
                  { value: "America", label: "America" },
                  { value: "Asia", label: "Asia" },
                  { value: "Europe", label: "Europe" },
                  { value: "Oceania", label: "Oceania" },
                ]}
              />
            </section>
          </div>
        </div>
      );
    },

    CountriesList: ({ countries, search }: any) => {
      return (
        <div className="w-full border  justify-around ">
          <ul className="card-grid">
            {search(countries).map((item: any) => (
              <li key={item.name}>
                <article className="card" key={item.alpha3Code}>
                  <div className="card-image">
                    <img src={item.flag.large} alt={item.name} />
                  </div>
                  <div className="card-content">
                    <h2 className="card-name">{item.name}</h2>
                    <ol className="card-list">
                      <li>
                        population: <span>{item.population}</span>
                      </li>
                      <li>
                        Region: <span>{item.region}</span>
                      </li>
                      <li>
                        Capital: <span>{item.capital}</span>
                      </li>
                    </ol>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      );
    },
  },

  constants: {
    searchParam: ["capital", "name", "numericCode"],
  },
};

const {
  components: { Loading, Errors, Filters, CountriesList },
  constants: { searchParam },
} = resources;

function App() {
  const [q, setQ] = useState("");
  const [filterParam, setFilterParam] = useState("All");

  const { data: countriesData, isLoading, isError, error } = useCountryQuery();

  function search(items: any) {
    return items.filter((item: any) => {
      if (item.region.includes(filterParam) || filterParam === "All") {
        return searchParam.some((newItem) => {
          return item[newItem].toString().toLowerCase().includes(q.toLowerCase());
        });
      }
    });
  }

  if (isError) {
    return <Errors {...{ error }} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const countries = Object.values(countriesData);
  const filteredCountries = search(countries);
  const searchCount = filteredCountries.length;
  const totalCount = countries.length;

  return (
    <>
      <Filters {...{ q, setQ, filterParam, setFilterParam, search, searchCount, totalCount }} />
      <CountriesList {...{ countries, search }} />
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
