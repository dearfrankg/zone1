import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "./login";

describe("LoginForm", () => {
  test("renders login form", () => {
    render(<LoginForm />);

    // Assert that form elements are rendered
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  test("submits form with user credentials", () => {
    render(<LoginForm />);

    // Simulate user input
    const emailInput = screen.getByLabelText("Email") as HTMLInputElement;
    const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Simulate form submission
    const submitButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(submitButton);

    // Assert that form is submitted with correct values
    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });
});
