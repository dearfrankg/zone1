"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Image from "next/image";
import { Button } from "antd";
import { useGames } from "./query";
import Loading from "./loading";

const queryClient = new QueryClient();

const resources = {
  components: {
    // eslint-disable-next-line
    Errors: ({ error }: { error: any }) => <p>{error.message}</p>,
  },
};

const {
  components: { Errors },
} = resources;

function App() {
  const { data: games, isLoading, isError, error } = useGames();

  if (isError) {
    return <Errors {...{ error }} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const handleClick = () => {
    window.open("https://ui.shadcn.com/", "_blank");
  };

  return (
    <>
      <Button onClick={handleClick}>https://ui.shadcn.com/</Button>
      <main className="w-full m-24 rounded-md grid grid-cols-4 gap-12">
        {games.map(game => (
          <div key={game.id} className="col-span-4 2xl:col-span-2">
            <h1 className="text-lg font-medium">{game.name}</h1>
            <p className="font-normal">Rating: {game.rating}</p>
            <div className="aspect-video relative">
              <Image src={game.background_image} fill className="object-cover rounded-md" alt={game.name} />
            </div>
          </div>
        ))}
      </main>
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
