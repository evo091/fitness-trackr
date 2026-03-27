import { useAuth } from "../auth/AuthContext";
import { useState, useEffect } from "react";
import { createSet } from "../api/routines";
import { getActivities } from "../api/activities";
import { ToastContainer, toast } from "react-toastify";


export default function Sets() {
  const { token } = useAuth();
  const [activities, setActivities] = useState([]);

  const syncActivities = async () => {
    const data = await getActivities();
    setActivities(data);
  };

  useEffect(() => {
    getActivities().then(setActivities);
  }, []);

  const tryCreateSet = async (formData) => {

    const reps = formData.get("count");
    const setId = formData.get("id");

    try {
      await createSet(token, { reps, setId });
      syncActivities();
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
        <button>Add Set</button>
      </form>
      <ToastContainer/>
    </>
  );
}