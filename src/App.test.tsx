import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

describe("App", () => {
  it("Lands on a bad page if route dose not exists", () => {
    const badRoute = "/some/route/that/dose/not/exists";
    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Ooops/i)).toBeInTheDocument();
  });
});
