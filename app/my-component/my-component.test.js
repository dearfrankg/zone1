import { render, screen, fireEvent } from "@testing-library/react";
import MyComponent from "./page";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const pushMock = jest.fn();

useRouter.mockReturnValue({
  push: pushMock,
});

describe("MyComponent", () => {
  test('navigates to "/users" route when button is clicked', () => {
    render(<MyComponent />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(pushMock).toHaveBeenCalledWith("/users");
    expect(pushMock).toHaveBeenCalledTimes(1);
  });
});
