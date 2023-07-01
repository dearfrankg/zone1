import { renderHook, waitFor } from "@testing-library/react";
import { ReactNode } from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { responseForPage0, responseForPage1, responseForPage2 } from "../fixtures";
import { useUsersQuery } from "../useInfiniteQuery";

const queryCache = new QueryCache();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const server = setupServer(
  rest.get("https://dummyapi.io/data/v1/user", (req, res, ctx) => {
    const pageNumber = req.url.searchParams.get("page");
    let response;

    if (pageNumber === "0") {
      response = responseForPage0;
    } else if (pageNumber === "1") {
      response = responseForPage1;
    } else if (pageNumber === "2") {
      response = responseForPage2;
    }

    return res(ctx.json(response));
  })
);

describe("useUsersQuery", () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    queryCache.clear();
  });
  afterAll(() => server.close());

  it("fetches the users list", async () => {
    // Fetches Page 0
    const { result } = renderHook(() => useUsersQuery(), { wrapper });

    await waitFor(() => !result.current.isSuccess);
    await waitFor(() => result.current.isSuccess);

    expect(result.current.data?.pages[0]).toStrictEqual({
      results: responseForPage0.data,
      next: 1,
    });

    // Fetches Page 1
    result.current.fetchNextPage();
    await waitFor(() => result.current.isFetching);
    await waitFor(() => !result.current.isFetching);

    expect(result.current.data?.pages).toStrictEqual([
      { results: responseForPage0.data, next: 1 },
      { results: responseForPage1.data, next: 2 },
    ]);

    // Fetches Page 2
    result.current.fetchNextPage();
    await waitFor(() => result.current.isFetching);
    await waitFor(() => !result.current.isFetching);

    expect(result.current.data?.pages).toStrictEqual([
      { results: responseForPage0.data, next: 1 },
      { results: responseForPage1.data, next: 2 },
      { results: responseForPage2.data, next: undefined },
    ]);
  });
});
