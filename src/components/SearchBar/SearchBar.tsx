/**
 * @file SearchBar component definition file
 */

// External imports
import { FormEvent, useRef } from "react";

// Internal imports
import logo from "../../search.svg";

// Styles imports
import styles from "./SearchBar.module.css";

// Types
type SearchBarProps = {
  placeholder: string;
  buttonText: string;
  onSearch: (value: string) => void;
};

const SearchBar = ({ placeholder, buttonText, onSearch }: SearchBarProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: FormEvent) => {
    event.preventDefault();
    const value = searchInputRef.current?.value.trim();
    if (searchInputRef.current && value === "") {
      searchInputRef.current.value = "";
    }
    value && onSearch(value);
  };

  return (
    <form className={styles.root} onSubmit={handleChange}>
      <img className={styles.icon} src={logo} width="23" alt="search icon" />
      <input
        ref={searchInputRef}
        className={styles.searchField}
        type="search"
        placeholder={placeholder}
        aria-label={placeholder}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      ></input>
      <button type="submit" className={styles.btn}>
        {buttonText}
      </button>
    </form>
  );
};
export default SearchBar;
