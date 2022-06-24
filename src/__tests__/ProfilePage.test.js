import React from "react";
import ReactDOM from "react-dom/client";
import ProfilePage from "../profile/ProfilePage.js";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

jest.mock("axios");

it("renders without crashing", () => {
    const div = document.createElement("div");
    const root = ReactDOM.createRoot(div);
    root.render(<ProfilePage />);
  });

it("Buttons renders properly", async () => {
    render(<BrowserRouter><ProfilePage/></BrowserRouter>);

    expect(screen.getByText("Email")).toBeInTheDocument();
});

it("Buttons function as intended", async () => {
    render(<BrowserRouter><ProfilePage/></BrowserRouter>);

    fireEvent.click(screen.getAllByText("Edit")[1]);

    expect(screen.getByText("Save")).toBeInTheDocument();
});

it("Text fields are editable", async () => {
    render(<BrowserRouter><ProfilePage/></BrowserRouter>);

    fireEvent.click(screen.getAllByText("Edit")[1]);

    fireEvent.change(screen.getByPlaceholderText("First Name"), {
        target: { value: "Testing First Name" },
      });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
        target: { value: "Testing Last Name" },
      });
    fireEvent.change(screen.getByPlaceholderText("Postal/Zip Code"), {
        target: { value: "Testing Postal Code" },
      });
      fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
        target: { value: "Testing Phone Num" },
      });
    fireEvent.change(screen.getByPlaceholderText("Province/State"), {
        target: { value: "Testing Province" },
      });
    fireEvent.change(screen.getByPlaceholderText("City"), {
        target: { value: "Testing City" },
      });

    expect(screen.getByText("Save")).toBeInTheDocument();
});

