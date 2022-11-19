/**
 * @file    GitHub services test file
 */

// External imports
import { setupServer } from "msw/node";

// Internal imports
import { handlers } from "./__mock__/httpHandlers";
import { getGitHubUser, getGitHubUserEvents } from "./githubService";

// Mocked Data

import notFound from "./__mock__/data/notFound.data.json";

// Setup the server with the mocked httpHandlers
const server = setupServer(...handlers);

// Test cleanup
beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
});

describe("getGitHubUser", () => {
  it("should be able to return data", async () => {
    const searchText = "zak";
    const data = await getGitHubUser(searchText);
    expect(data).toEqual({
      followers: 20,
      following: 22,
      gistsNumber: 155,
      gitHubUrl: "https://github.com/zak",
      id: "zak",
      image: "https://avatars.githubusercontent.com/u/16280?v=4",
      name: "Колесников Андрей",
      reposNumber: 19,
    });
  });

  it("should be able to return error status", async () => {
    const searchText = "name_that_dose_not_exists";
    await expect(getGitHubUser(searchText)).rejects.toThrow(
      JSON.stringify(notFound)
    );
  });
});

describe("getGitHubUserEvents", () => {
  it("should be able to return data", async () => {
    const searchText = "zak";
    const data = await getGitHubUserEvents(searchText);
    expect(data).toContainEqual({
      organizationImage: null,
      organizationName: null,
      repoId: 429117914,
      repoName: "Udj13/AGLoRa",
      repoUrl: "https://api.github.com/repos/Udj13/AGLoRa",
      type: "WatchEvent",
    });
  });

  it("should be able to return error status", async () => {
    const searchText = "name_that_dose_not_exists";
    await expect(getGitHubUserEvents(searchText)).rejects.toThrow(
      JSON.stringify(notFound)
    );
  });
});
