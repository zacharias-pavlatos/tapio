/**
 * @file UserEvents page file definition
 */

// External imports
import { useParams } from "react-router-dom";

// Internal imports
import EventCard from "../../components/EventCard";
import useUserEvents from "../../hooks/useUserEvents";

// Styles imports
import styles from "./UserEvents.module.css";

const UserEvents = () => {
  const { username } = useParams();
  const { events, eventsLoading, eventsError } = useUserEvents(username);

  if (eventsError === 404) return <div>User not found</div>;
  if (eventsError === 403) return <div>Api limit reached</div>;
  if (eventsLoading) return <div>loading</div>;
  if (!events?.length) return <div>No events for the user</div>;

  return (
    <div className={styles.root}>
      {events?.map((event) => (
        <EventCard key={event.id} {...event} />
      ))}
    </div>
  );
};
export default UserEvents;
