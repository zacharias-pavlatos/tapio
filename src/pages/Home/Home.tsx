/**
 * @file Home page file definition
 */

// External imports
import { useSearchParams } from "react-router-dom";

// Internal imports
import Card from "../../components/Card";
import SearchBar from "../../components/SearchBar";
import useUser from "../../hooks/useUser";

// Styles imports
import styles from "./Home.module.css";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, isLoading, isError } = useUser(searchParams.get("user"));

  const handleSearch = (searchTerm: string) => {
    setSearchParams({ user: searchTerm });
  };

  return (
    <div className={styles.home}>
      <SearchBar
        placeholder="GitHub username..."
        buttonText="Search"
        onSearch={handleSearch}
      />

      {isError === 404 && <div>User not found</div>}
      {isError === 403 && <div>Api limit reached</div>}
      {isLoading && <div>Loading</div>}

      {user && (
        <Card
          id={user.login}
          name={user.name}
          image={user.avatar_url}
          reposNumber={user.public_repos}
          gistsNumber={user.public_gists}
          followers={user.followers}
          following={user.following}
          gitHubUrl={user.html_url}
        />
      )}
    </div>
  );
};
export default Home;
