/**
 * @file Error page file definition
 */

// Internal imports
import { Link } from "react-router-dom";

// Styles imports
import styles from "./Error.module.css";

const Error = () => {
  return (
    <div className={styles.root}>
      <h1>Ooops</h1>
      <p>404 - Page not found!</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default Error;
