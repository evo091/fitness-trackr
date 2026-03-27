import { useAuth } from "../auth/AuthContext";
import { useState, useEffect } from "react";
import { createRoutine } from "../api/routines";
import { getActivities } from "../api/activities";
import { ToastContainer, toast } from "react-toastify";

export default function RoutinesForm({ syncActivities }) {

  const { token } = useAuth();
  const [activities, setActivities] = useState([]);
  //const [error, setError] = useState(null);

  useEffect(() => {
    getActivities().then(setActivities);
  }, []);

  const tryCreateRoutine = async (formData) => {
    //setError(null);

    const name = formData.get("name");
    const description = formData.get("description");
    const activityId = formData.get("activities");
    const goal = formData.get("goal")
    try {
      await createRoutine(token, { name, description, activityId, goal });
      syncActivities();
    } catch (e) {
        toast.error(e.message);
    }
  };

  return (
    <>
      <h2>Add a new routine</h2>
      <form action={tryCreateRoutine}>
        <label>
          Name
          <input type="text" name="name" />
        </label>
        <label>
          Description
          <input type="text" name="description" />
        </label>
        <label>
          Goal
          <input type="text" name="goal" />
        </label>
        <select name="activities">
          {activities.map(activity => (
            <option key={activity.id} value={activity.id}>{activity.name}</option>
          ))}
        </select>
        <button>Add Routine</button>
      </form>
      <ToastContainer/>
    </>
  );
}