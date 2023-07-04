"use client";

import { useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useReposQuery, UseReposQueryProps } from "./github-services";
import { Title, Table, Alerts } from "./components";
import { GithubRecord } from "./types";

const queryClient = new QueryClient();

function App() {
  const [filters, setFilter] = useState({
    pageSize: 10,
    currentPage: 1,
  });
  const set = (newProps: UseReposQueryProps) => setFilter((props: UseReposQueryProps) => ({ ...props, ...newProps }));

  const handle = {
    rowClick: (record: GithubRecord) => {
      // eslint-disable-next-line no-console
      console.log("record: ", record);
    },

    paginationChange: (_currentPage: number, _pageSize: number) => {
      set({
        currentPage: _currentPage,
        pageSize: _pageSize,
      });
    },
  };

  const repos = useReposQuery(filters);

  return (
    <main data-testid="repos-wrapper">
      <Title>Repos List</Title>
      <Alerts {...{ status: repos.status, errorMessage: (repos?.error as Error).message }} />
      <Table
        {...{
          dataSource: repos?.data?.results,
          total: repos?.data?.total,
          loading: repos?.isLoading,
          handle,
        }}
      />
    </main>
  );
}

export default function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}
