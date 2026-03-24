
import { Link } from "react-router";

export default function ActivityList({ activities }) {

    return (
      <>
        <ul>
          {activities.map((activity) => (
            <li key={activity.id}>
              <Link to = {"/activity/" + activity.id}>
                {activity.name}
              </Link>
            </li>
          ))}
        </ul>
    </>
    );
  }
