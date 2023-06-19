"use client";

import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";

const queryClient = new QueryClient();

const API_URL = process.env.API_URL;

const fetchUsers1 = () => fetch(`${API_URL}/users`).then((res) => res.json());
const fetchUsers2 = () =>
  axios.get(`${API_URL}/users`).then(({ data }) => data);
const fetchUsers3 = () =>
  axios.get(`${API_URL}/users`).then(({ data }) => data);

function ParallelQueries() {
  const users1 = useQuery({ queryKey: ["users1"], queryFn: fetchUsers1 });
  const users2 = useQuery({ queryKey: ["users2"], queryFn: fetchUsers2 });
  const users3 = useQuery({ queryKey: ["users3"], queryFn: fetchUsers3 });

  if (users1.isLoading || users2.isLoading || users3.isLoading) {
    return <h1>Loading...</h1>;
  }

  const Pretty = ({ data }: any) => <pre>{JSON.stringify(data, null, 2)}</pre>;

  return (
    <div className="space-y-4">
      <div className="text-xl font-medium">
        Open the dev-tools network tab and watch three queries run in parallel
      </div>
      <div>
        <Pretty data={users1.data} />
      </div>
      <div>
        <Pretty data={users2.data} />
      </div>
      <div>
        <Pretty data={users3.data} />
      </div>
    </div>
  );
}

const Root = () => (
  <QueryClientProvider client={queryClient}>
    <ParallelQueries />
  </QueryClientProvider>
);

export default Root;
