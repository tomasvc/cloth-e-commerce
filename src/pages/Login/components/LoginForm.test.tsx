import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "./LoginForm";
import { BrowserRouter } from "react-router-dom";

const mockOnSubmit = jest.fn();
const mockOnGoogleSignIn = jest.fn();

const renderLoginForm = (props = {}) => {
  const defaultProps = {
    onSubmit: mockOnSubmit,
    onGoogleSignIn: mockOnGoogleSignIn,
    error: null,
    isLoading: false,
  };

  return render(
    <BrowserRouter>
      <LoginForm {...defaultProps} {...props} />
    </BrowserRouter>
  );
};

describe("LoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the login form", () => {
    renderLoginForm();
    const loginHeader = screen.getByRole("heading", { name: "Login" });
    expect(loginHeader).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in with google/i })
    ).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  it("submits the form with valid inputs", async () => {
    renderLoginForm();

    await userEvent.type(screen.getByLabelText("Email"), "test@example.com");
    await userEvent.type(screen.getByLabelText("Password"), "password123");

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        "test@example.com",
        "password123"
      );
    });
  });

  it("displays validation errors for invalid inputs", async () => {
    renderLoginForm();

    await userEvent.type(screen.getByLabelText("Email"), "invalid-email");
    await userEvent.type(screen.getByLabelText("Password"), "short");

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(screen.getByText("Invalid email address")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        screen.getByText("Password must be at least 8 characters")
      ).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("displays loading spinner when isLoading is true", () => {
    renderLoginForm({ isLoading: true });
    const button = screen.getByTestId("login-button");
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(within(button).getByTestId("spinner")).toBeInTheDocument();
    expect(button).not.toHaveTextContent("Login");
  });

  it("displays error message when error prop is provided", () => {
    const errorMessage = "Invalid credentials";
    renderLoginForm({ error: errorMessage });
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("calls onGoogleSignIn when Google sign-in button is clicked", () => {
    renderLoginForm();
    fireEvent.click(
      screen.getByRole("button", { name: /sign in with google/i })
    );
    expect(mockOnGoogleSignIn).toHaveBeenCalled();
  });
});
