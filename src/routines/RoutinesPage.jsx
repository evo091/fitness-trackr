import { useState, useEffect } from "react";
import { getRoutines } from "../api/routines";

import RoutinesList from "./RoutinesList";
import RoutinesForm from "./RoutinesFormForm";

export default function ActivitiesPage() {
  const [routines, setRoutines] = useState([]);

  const syncActivities = async () => {
    const data = await getRoutines();
    setRoutines(data);
  };

  useEffect(() => {
    syncActivities();
  }, []);

  return (
    <>
      <h1>Activities</h1>
      <RoutinesList activities={routines} syncActivities={syncActivities}/>
      <RoutinesForm syncActivities={syncActivities} />
    </>
  );
}
