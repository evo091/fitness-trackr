import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { deleteActivity } from "../api/activities";

export default function ActivityList({ activities, syncActivities }) {

  const { token } = useAuth();
  const [error, setError] = useState();

    const handleDelete = async (activity) => {
    setError(null);
    try {
      await deleteActivity(token, activity);
      syncActivities();
    } catch (e) {
      setError(e.message);
    }
  };

  if (!token) {
        return (
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>{activity.name}</li>
        ))}
      </ul>
    );
  } else {
    return (
      <>
        {error && <p role="alert">{error}</p>}
        <ul>
          {activities.map((activity) => (
            <li key={activity.id}>
              {activity.name}
              <button
                id="delete"
                className="delete-button"
                onClick={() => handleDelete(activity)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
    </>
    );
  }
}
