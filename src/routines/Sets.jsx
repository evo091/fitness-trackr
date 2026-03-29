import { useAuth } from "../auth/AuthContext";
import { useState, useEffect } from "react";
import { createSet } from "../api/routines";
import { getActivities } from "../api/activities";
import { ToastContainer, toast } from "react-toastify";


export default function Sets({ routineId, setCreated }) {
  const { token } = useAuth();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    getActivities().then(setActivities);
  }, []);

  const tryCreateSet = async (formData) => {

    const activityId = formData.get("activities");
    const count = formData.get("reps");

    try {
      await createSet(token, { routineId, activityId, count });
      if (setCreated) {
        await setCreated();
      }
    } catch (e) {
        toast.error(e.message);
    }
  };

  return (
    <>
      <h2>Add a new set</h2>
      <form action={tryCreateSet}>
        <select name="activities">
          {activities.map(activity => (
            <option key={activity.id} value={activity.id}>{activity.name}</option>
          ))}
        </select>
        <label>
            Reps
            <input type="number" name="reps"/>
        </label>
        <label>
          Duration
            <input type="number" name="duration"/>
        </label>
        <button>Add Set</button>
      </form>
      <ToastContainer/>
    </>
  );
}