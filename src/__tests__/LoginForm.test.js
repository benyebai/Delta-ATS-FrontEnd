import React from "react";
import ReactDOM from "react-dom/client";
import LoginForm from "../loginForm/LoginForm";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

jest.mock("axios");

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = ReactDOM.createRoot(div);
  act(() => {
    root.render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );
  });
});

describe("login checks", () => {
  it("checks email", () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Log in"));

    expect(screen.getByText("Please enter an email")).toBeInTheDocument();
  });
  
  it("checks pasword", () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "123@a.bc" },
    });
    fireEvent.click(screen.getByText("Log in"));

    expect(screen.getByText("Please enter a password")).toBeInTheDocument();
  });
});

describe("register checks", () => {
  it("is able to switch to register", async () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Register"));

    expect(screen.getByText("Continue")).toBeInTheDocument();
  });

  it("passes email check", async () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Register"));
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "123@a.bc" },
    });
    fireEvent.click(screen.getByText("Continue"));

    expect(
      screen.getByText("Password must be at least 8 characters")
    ).toBeInTheDocument();
  });

  it("passes password check", async () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Register"));
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "123@a.bc" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "1234567" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "1234567" },
    });
    fireEvent.click(screen.getByText("Continue"));
    expect(
      screen.getByText("Password must be at least 8 characters")
    ).toBeInTheDocument();
  });

  it("passes confirm password check", async () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Register"));
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "123@a.bc" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123A@a.bc" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "123A@a.jhfbc" },
    });
    fireEvent.click(screen.getByText("Continue"));

    expect(screen.getByText("Passwords are not matching")).toBeInTheDocument();
  });
});
