import ProfilePage from "../profile/ProfilePage.js"
import React from 'react';
import ReactDOM from 'react-dom/client';
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import { BrowserRouter} from "react-router-dom";

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

    fireEvent.click(screen.getByText('Edit'));

    await waitFor(() => screen.getByText('save'))

    expect(screen.getByText("save")).toBeInTheDocument();
});

