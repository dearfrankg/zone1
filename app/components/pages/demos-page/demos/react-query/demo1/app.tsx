import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

type post = { id: any; title: string };

const POSTS: post[] = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
];

export default function App() {
  const queryClient = useQueryClient();

  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...POSTS]),
    // queryFn: () => Promise.reject("Error Message"),
  });

  const newPostMutation = useMutation({
    mutationFn: (title: any) => {
      return wait(1000).then(() =>
        POSTS.push({ id: crypto.randomUUID(), title })
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  if (postQuery.isLoading) return <h1>Loading...</h1>;

  if (postQuery.isError) {
    return <pre>{JSON.stringify(postQuery.error)}</pre>;
  }

  return (
    <>
      <h1 className="mb-2">TanStack Query</h1>
      <div>
        {postQuery.data.map((post) => (
          <div className="py-1" key={post.id}>
            {post.title}
          </div>
        ))}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-4 py-2 px-4 rounded"
          onClick={() => newPostMutation.mutate("New Post")}
        >
          Add New
        </button>
      </div>
    </>
  );
}

function wait(duration: any) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}
