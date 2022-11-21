/**
 * @file    UserEvents page behavior test
 */

// External Imports
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { SWRConfig } from "swr";
import { setupServer } from "msw/node";

// Internal Imports
import UserEvents from "./UserEvents";
import { handlers } from "../../__mock__/httpHandlers";

// Setup the server with the mocked httpHandlers
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
});

describe("Events page", () => {
  it("Should be sable to get user events based on params", async () => {
    render(
      <MemoryRouter initialEntries={["/events/zak"]}>
        <Routes>
          <Route
            path="/events/:username"
            element={
              <SWRConfig
                value={{ dedupingInterval: 0, provider: () => new Map() }}
              >
                <UserEvents />
              </SWRConfig>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText("loading")).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.queryByText("loading"));

    expect(await screen.findByText("mapbox")).toBeInTheDocument();
  });

  it("Should be able to get a 404 user not found", async () => {
    render(
      <MemoryRouter initialEntries={["/events/name_that_dose_not_exists"]}>
        <Routes>
          <Route
            path="/events/:username"
            element={
              <SWRConfig
                value={{ dedupingInterval: 0, provider: () => new Map() }}
              >
                <UserEvents />
              </SWRConfig>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText("loading")).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.queryByText("loading"));

    expect(await screen.findByText("User not found")).toBeInTheDocument();
  });

  it("Should be able to get a 403 Api limit reached", async () => {
    render(
      <MemoryRouter initialEntries={["/events/rate_limit"]}>
        <Routes>
          <Route
            path="/events/:username"
            element={
              <SWRConfig
                value={{ dedupingInterval: 0, provider: () => new Map() }}
              >
                <UserEvents />
              </SWRConfig>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText("loading")).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.queryByText("loading"));

    expect(await screen.findByText("Api limit reached")).toBeInTheDocument();
  });

  it("Should be able to check for empty events", async () => {
    render(
      <MemoryRouter initialEntries={["/events/no_events"]}>
        <Routes>
          <Route
            path="/events/:username"
            element={
              <SWRConfig
                value={{ dedupingInterval: 0, provider: () => new Map() }}
              >
                <UserEvents />
              </SWRConfig>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText("loading")).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.queryByText("loading"));

    expect(
      await screen.findByText("No events for the user")
    ).toBeInTheDocument();
  });
});
