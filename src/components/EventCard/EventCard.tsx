/**
 * @file EventCard component definition file
 */

// External imports

// Internal imports
import githubLogo from "../../github.svg";

// Styles imports
import styles from "./EventCard.module.css";

type EventCardProps = {
  type: string;

  repo: {
    id: number;
    name: string;
    url: string;
  };
  org?: {
    avatar_url: string;
    login: string;
  };
};

const EventCard = ({ type, repo, org }: EventCardProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.imgCon}>
        <img
          className={styles.orgAvatar}
          src={org?.avatar_url ?? githubLogo}
          alt={`Avatar`}
        />
      </div>

      <div>
        <div className={styles.name}>{type}</div>
        <div className={styles.repos}>{repo.name}</div>

        <a
          href={`https://github.com/${org?.login}`}
          target="_blank"
          rel="noreferrer"
        >
          {org?.login}
        </a>

        <div className={styles.organization}></div>
      </div>
    </div>
  );
};

export default EventCard;
