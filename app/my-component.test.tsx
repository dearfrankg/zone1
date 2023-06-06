import { render, screen } from "@testing-library/react";
import { QueryClientProvider, QueryClient } from "react-query";
import { useRouter } from "next/router";
import MyComponent from "./MyComponent";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const queryClient = new QueryClient();

describe("MyComponent", () => {
  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      push: jest.fn(),
      query: {},
    }));

    render(
      <QueryClientProvider client={queryClient}>
        <MyComponent />
      </QueryClientProvider>
    );
  });

  it("renders the component with data from the API", async () => {
    // Mock the API response using jest.mock or a library like nock
    // Example:
    // jest.mock('axios');
    // axios.get.mockResolvedValueOnce({ data: { message: 'Mock data' } });

    // Wait for the data to load
    await screen.findByText("Mock data");

    // Assert that the component renders the data correctly
    expect(screen.getByText("Mock data")).toBeInTheDocument();
  });

  it("navigates to another route when a button is clicked", async () => {
    // Mock the API response if necessary

    // Wait for the data to load
    await screen.findByText("Mock data");

    // Mock the useRouter hook
    const mockRouter = useRouter();
    const pushMock = jest.fn();
    mockRouter.push = pushMock;

    // Click the button that triggers navigation
    const button = screen.getByRole("button");
    userEvent.click(button);

    // Assert that the router push function is called with the correct path
    expect(pushMock).toHaveBeenCalledWith("/another-route");
  });
});
