import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import MyComponent from "./page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockRouter = { push: jest.fn() };

describe("MyComponent", () => {
  beforeEach(() => {
    useRouter.mockReturnValue(mockRouter);
  });

  test("renders component correctly", () => {
    render(<MyComponent />);
    expect(screen.getByText("My Component")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("navigates to /users on button click", () => {
    render(<MyComponent />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockRouter.push).toHaveBeenCalledWith("/users");
  });
});
