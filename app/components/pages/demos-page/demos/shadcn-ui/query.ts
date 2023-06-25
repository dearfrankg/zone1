"use client";

import { useQuery } from "@tanstack/react-query";

type Game = {
  id: number;
  background_image: string;
  rating: number;
  name: string;
};

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fetchGames = async (): Promise<Game[]> => {
  const res = await fetch(`https://api.rawg.io/api/games?key=${process.env.RAWG}`).then(async response => {
    await wait(2000);
    return response;
  });
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  const json = await res.json();

  return json.results;
};

export const useGames = () => {
  return useQuery({ queryKey: ["games"], queryFn: fetchGames });
};
