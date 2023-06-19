"use client";

import { useQuery } from "@tanstack/react-query";

const URL = "https://raw.githubusercontent.com/iamspruce/search-filter-painate-reactjs/main/data/countries.json";

const wait = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchContries = () =>
  fetch(URL).then(async (res) => {
    await wait(1000);
    return res.json();
  });

export const useCountryQuery = () => {
  return useQuery(["countries"], fetchContries);
};
