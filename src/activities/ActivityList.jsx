import { useAuth } from "../auth/AuthContext";
import { deleteActivity } from "../api/activities";

export default function ActivityList({ activities, syncActivities }) {

  const { token } = useAuth();

  return (
    <ul>
      {activities.map((activity) => (
        <li key={activity.id}>{activity.name}
            <button onClick={ async () =>{await deleteActivity(token, activity); syncActivities()}}>X</button>
        </li>
      ))}
    </ul>
  );
}
