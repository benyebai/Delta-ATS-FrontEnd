import React from "react";
import ReactDOM from "react-dom/client";
import RegisterForm from "../registerForm/RegisterForm";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = ReactDOM.createRoot(div);
  root.render(<RegisterForm />);
});

it("test full name", async () => {
  render(
    <BrowserRouter>
      <RegisterForm
        info={JSON.stringify({
          email: "testing1@gmail.com",
          password: "Testing1",
        })}
      />
    </BrowserRouter>
  );

  fireEvent.change(screen.getByPlaceholderText("First Name"), {
    target: { value: '123badName //"!%^$#SQLinjection' },
  });

  fireEvent.click(screen.getByText("Register"));

  expect(screen.getByText("Please enter in a Full Name")).toBeInTheDocument();
});

it("test province/state", async () => {
  render(
    <BrowserRouter>
      <RegisterForm
        info={JSON.stringify({
          email: "testing1@gmail.com",
          password: "Testing1",
        })}
      />
    </BrowserRouter>
  );

  fireEvent.change(screen.getByPlaceholderText("First Name"), {
    target: { value: "TestingFirstName" },
  });

  fireEvent.change(screen.getByPlaceholderText("Last Name"), {
    target: { value: "TestingLastName" },
  });

  fireEvent.click(screen.getByText("Country"));
  fireEvent.click(screen.getByText("Canada"));

  fireEvent.click(screen.getByText("Register"));

  expect(
    screen.getByText("Please enter in a Province/State")
  ).toBeInTheDocument();
});

it("test postal/zip code", async () => {
  render(
    <BrowserRouter>
      <RegisterForm
        info={JSON.stringify({
          email: "testing1@gmail.com",
          password: "Testing1",
        })}
      />
    </BrowserRouter>
  );

  fireEvent.change(screen.getByPlaceholderText("First Name"), {
    target: { value: "TestingFirstName" },
  });

  fireEvent.change(screen.getByPlaceholderText("Last Name"), {
    target: { value: "TestingLastName" },
  });

  fireEvent.click(screen.getByText("Country"));
  fireEvent.click(screen.getByText("Canada"));
  fireEvent.click(screen.getByText("Province"));
  fireEvent.click(screen.getByText("British Columbia"));

  fireEvent.change(screen.getByPlaceholderText("City"), {
    target: { value: "TestingCity" },
  });

  fireEvent.change(screen.getByPlaceholderText("Postal/Zip Code"), {
    target: { value: "BadZIPCODE!!!@!@$#@$@" },
  });

  fireEvent.change(screen.getByPlaceholderText("Address"), {
    target: { value: "TestingAddress" },
  });
  fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
    target: { value: "1234567890" },
  });

  fireEvent.click(screen.getByText("Register"));

  expect(
    screen.getByText("Please input a valid Postal/Zip code")
  ).toBeInTheDocument();
});

it("test phone number", async () => {
  render(
    <BrowserRouter>
      <RegisterForm
        info={JSON.stringify({
          email: "testing1@gmail.com",
          password: "Testing1",
        })}
      />
    </BrowserRouter>
  );

  fireEvent.change(screen.getByPlaceholderText("First Name"), {
    target: { value: "TestingFirstName" },
  });

  fireEvent.change(screen.getByPlaceholderText("Last Name"), {
    target: { value: "TestingLastName" },
  });

  fireEvent.click(screen.getByText("Country"));
  fireEvent.click(screen.getByText("Canada"));
  fireEvent.click(screen.getByText("Province"));
  fireEvent.click(screen.getByText("British Columbia"));

  fireEvent.change(screen.getByPlaceholderText("City"), {
    target: { value: "TestingCity" },
  });
  fireEvent.change(screen.getByPlaceholderText("Postal/Zip Code"), {
    target: { value: "a1a1a1" },
  });
  fireEvent.change(screen.getByPlaceholderText("Address"), {
    target: { value: "TestingAddress" },
  });
  fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
    target: { value: "BadPhoneNUMBER!@$@@##@" },
  });

  fireEvent.click(screen.getByText("Register"));

  expect(
    screen.getByText("Please input only numbers for the phone number")
  ).toBeInTheDocument();
});
