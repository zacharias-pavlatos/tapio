/**
 * @file    Defines Mapping of GitHub service
 *
 */

// Types imports
import {
  GitHubResponseUser,
  GithubUser,
  GitHubResponseUserEvent,
  UserEvent,
} from "./gitHubService.types";

export const mapGitHubUser = (raw: GitHubResponseUser): GithubUser => {
  return {
    id: raw.login,
    name: raw.name,
    image: raw.avatar_url,
    reposNumber: raw.public_repos,
    gistsNumber: raw.public_gists,
    followers: raw.followers,
    following: raw.following,
    gitHubUrl: raw.html_url,
  };
};

export const mapGithubUserEvent = (
  raw: GitHubResponseUserEvent[]
): UserEvent[] => {
  return raw.map((userEvent) => ({
    type: userEvent.type,
    repoId: userEvent.repo.id,
    repoName: userEvent.repo.name,
    repoUrl: userEvent.repo.url,
    organizationName: userEvent.org?.login || null,
    organizationImage: userEvent.org?.avatar_url || null,
  }));
};
