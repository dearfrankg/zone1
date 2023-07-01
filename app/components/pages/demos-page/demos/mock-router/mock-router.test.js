import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import MyComponent from "./mock-router";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockRouter = { push: jest.fn() };

describe("MyComponent", () => {
  beforeEach(() => {
    useRouter.mockReset();
    useRouter.mockReturnValue(mockRouter);
  });

  test("renders component correctly", () => {
    render(<MyComponent />);
    expect(screen.getByText("Go to another route")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("navigates to /users on button click", () => {
    render(<MyComponent />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockRouter.push).toHaveBeenCalledWith("/demos");
  });
});
