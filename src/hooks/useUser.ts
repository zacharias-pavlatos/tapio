// External imports
import useSWR from "swr";

export const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw res.status;
  }

  return res.json();
};

const useUser = (username: string | null) => {
  const { data, error } = useSWR(
    !!username ? `https://api.github.com/users/${username}` : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      dedupingInterval: 5000,
    }
  );
  return {
    user: data,
    isLoading: !error && !data && !!username,
    isError: error,
  };
};
export default useUser;
