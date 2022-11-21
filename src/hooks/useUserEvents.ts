// External imports
import useSWR from "swr";
import { GitHubResponseUserEvent } from "./types";

export const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw res.status;
  }

  return res.json();
};

const useUserEvents = (username: string | undefined | null) => {
  const { data, error } = useSWR<GitHubResponseUserEvent[]>(
    `https://api.github.com/users/${username}/events`,
    fetcher
  );

  return {
    events: data,
    eventsLoading: !error && !data,
    eventsError: error,
  };
};
export default useUserEvents;
