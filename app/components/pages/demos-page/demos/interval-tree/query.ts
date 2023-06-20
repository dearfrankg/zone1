"use client";

import { useQuery } from "@tanstack/react-query";
import { composers } from "./data";

const wait = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchComposers = () =>
  Promise.resolve().then(async (res) => {
    await wait(1000);
    return composers;
  });

export const useComposers = () => {
  return useQuery(["composers"], fetchComposers);
};
