import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import AdvQuery from "./adv-query";
import { useReposQuery } from "./github-services";
import mockData from "./mock.json";

const mockedUseReposQuery = useReposQuery as jest.Mock;
jest.mock("./github-services");

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

interface Repo {
  id: number;
}

interface WrapperProps {
  children: ReactNode;
}

const wrapper = ({ children }: WrapperProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default wrapper;

describe("AdvQuery component", () => {
  it("should display the loading alert when loading", () => {
    mockedUseReposQuery.mockImplementation(() => ({
      status: "loading",
    }));
    render(<AdvQuery />, { wrapper });
    expect(screen.getByTestId("repos-loading")).toBeInTheDocument();
    expect(screen.getByText(/Loading.../i)).toBeVisible();
  });

  it("should display the error alert when error occurs", () => {
    mockedUseReposQuery.mockImplementation(() => ({
      status: "error",
    }));
    render(<AdvQuery />, { wrapper });
    expect(screen.getByTestId("repos-error")).toBeInTheDocument();
    expect(screen.getByText(/Error/i)).toBeVisible();
  });

  it("should display the records table when success", async () => {
    mockedUseReposQuery.mockImplementation(() => ({
      status: "success",
      data: {
        results: mockData.slice(0, 10),
        total: 110,
      },
    }));
    render(<AdvQuery />, { wrapper });

    const rows = document.querySelectorAll('tr[data-row-key]:not([data-row-key=""])');
    const actualIdsRendered = [...rows].map(element => Number(element.getAttribute("data-row-key")));
    const expectedIdsRendered = mockData.slice(0, 10).map((o: Repo) => o.id);

    expect(actualIdsRendered).toEqual(expectedIdsRendered);
  });

  it("should start with pagination defaults -- page-1 and page-size-10", async () => {
    mockedUseReposQuery.mockImplementation(() => ({
      status: "success",
      data: {
        results: mockData.slice(0, 10).slice(0),
        total: 110,
      },
    }));
    render(<AdvQuery />, { wrapper });

    const rows = document.querySelectorAll('tr[data-row-key]:not([data-row-key=""])');
    const actualIdsRendered = [...rows].map(element => Number(element.getAttribute("data-row-key")));
    const expectedIdsRendered = mockData.slice(0, 10).map((o: Repo) => o.id);

    expect(actualIdsRendered).toEqual(expectedIdsRendered);
  });
});
