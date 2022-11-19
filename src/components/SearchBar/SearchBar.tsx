/**
 * @file SearchBar component definition file
 */

// External imports
import { FormEvent, useRef } from "react";

// Styles imports
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: FormEvent) => {
    event.preventDefault();
    console.log(searchInputRef.current?.value);
  };

  return (
    <form onSubmit={handleChange}>
      <input ref={searchInputRef} type="search" placeholder="search"></input>
      <button>Search</button>
    </form>
  );
};
export default SearchBar;
