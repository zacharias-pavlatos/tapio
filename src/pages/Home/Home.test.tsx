/**
 * @file    Home behavior test
 */

// External Imports
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import user from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { SWRConfig } from "swr";

// Internal Imports
import Home from "./Home";
import { handlers } from "../../__mock__/httpHandlers";

// Setup the server with the mocked httpHandlers
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
});

describe("Home", () => {
  it("Should be able to get a searched user", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={
              <SWRConfig
                value={{ dedupingInterval: 0, provider: () => new Map() }}
              >
                <Home />
              </SWRConfig>
            }
          />
        </Routes>
      </MemoryRouter>
    );
    const input = screen.getByRole("searchbox", { name: "GitHub username..." });

    fireEvent.change(input, { target: { value: "zak" } });
    user.click(screen.getByRole("button", { name: /search/i }));

    expect(await screen.findByText("Loading")).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.queryByText("Loading"));

    expect(await screen.findByText("zak")).toBeInTheDocument();
  });

  it("Should be sable to get user based on searchParams", async () => {
    render(
      <MemoryRouter initialEntries={["/?user=zak"]}>
        <Routes>
          <Route
            path="/"
            element={
              <SWRConfig
                value={{ dedupingInterval: 0, provider: () => new Map() }}
              >
                <Home />
              </SWRConfig>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText("Loading")).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.queryByText("Loading"));

    expect(await screen.findByText("zak")).toBeInTheDocument();
  });

  it("Should be able to get a 404 user not found", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={
              <SWRConfig
                value={{ dedupingInterval: 0, provider: () => new Map() }}
              >
                <Home />
              </SWRConfig>
            }
          />
        </Routes>
      </MemoryRouter>
    );
    const input = screen.getByRole("searchbox", { name: "GitHub username..." });

    fireEvent.change(input, { target: { value: "name_that_dose_not_exists" } });
    user.click(screen.getByRole("button", { name: /search/i }));

    expect(await screen.findByText("Loading")).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.queryByText("Loading"));

    expect(await screen.findByText("User not found")).toBeInTheDocument();
  });

  it("Should be able to get a 403 Api limit reached", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={
              <SWRConfig
                value={{ dedupingInterval: 0, provider: () => new Map() }}
              >
                <Home />
              </SWRConfig>
            }
          />
        </Routes>
      </MemoryRouter>
    );
    const input = screen.getByRole("searchbox", { name: "GitHub username..." });

    fireEvent.change(input, { target: { value: "rate_limit" } });
    user.click(screen.getByRole("button", { name: /search/i }));

    expect(await screen.findByText("Loading")).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.queryByText("Loading"));

    expect(await screen.findByText("Api limit reached")).toBeInTheDocument();
  });
});
