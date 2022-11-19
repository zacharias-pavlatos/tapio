/**
 * @file GithubService definition file
 */

// Internal imports
import { mapGitHubUser, mapGithubUserEvent } from "./gitHubService.dataMapping";

// Types imports
import { GithubUser, UserEvent } from "./gitHubService.types";

export const getGitHubUser = async (username: string): Promise<GithubUser> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) throw new Error(await response.text());

    const user = await response.json();
    return mapGitHubUser(user);
  } catch (error) {
    // Error Logger goes here
    throw error;
  }
};

export const getGitHubUserEvents = async (
  username: string
): Promise<UserEvent[]> => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/events`
    );
    if (!response.ok) throw new Error(await response.text());

    const userEvent = await response.json();
    return mapGithubUserEvent(userEvent);
  } catch (error) {
    // Error Logger goes here
    throw error;
  }
};
