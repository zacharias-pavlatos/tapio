/**
 * @file Card component definition file
 */

// External imports
import { Link } from "react-router-dom";

// Internal imports
import githubIcon from "../../github.svg";

// Styles imports
import styles from "./Card.module.css";

type CardProps = {
  id: string;
  name: string;
  image: string;
  reposNumber: number;
  gistsNumber: number;
  followers: number;
  following: number;
  gitHubUrl: string;
};

const Card = ({
  id,
  name,
  image,
  gitHubUrl,
  reposNumber,
  gistsNumber,
  followers,
  following,
}: CardProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.main}>
        <div>
          <img
            className={styles.avatar}
            src={image}
            alt={`${name} profile avatar`}
          />
        </div>

        <div className={styles.mainCont}>
          <div className={styles.header}>
            <div>
              <div className={styles.name}>{id}</div>
              {!!name && <div>({name})</div>}
            </div>

            <div>
              <div className={styles.git}>
                <a href={gitHubUrl} target="_blank" rel="noreferrer">
                  <img src={githubIcon} width={25} alt="github icon" />
                  GitHub
                </a>
              </div>
            </div>
          </div>

          <div className={styles.infoCont}>
            <div className={styles.cel}>
              <label>Repositories</label>
              <div>{reposNumber}</div>
            </div>
            <div className={styles.cel}>
              <label>Gists</label>
              <div>{gistsNumber}</div>
            </div>
            <div className={styles.cel}>
              <label>Followers</label>
              <div>{followers}</div>
            </div>
            <div className={styles.cel}>
              <label>Following</label>
              <div>{following}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <Link to={`/events/${id}`}>go</Link>
      </div>
    </div>
  );
};

export default Card;
