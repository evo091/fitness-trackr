import { useState, useEffect } from "react";
import { getRoutines } from "../api/routines";

import RoutinesList from "./RoutinesList";
import RoutinesForm from "./RoutinesForm";

export default function RoutinesPage() {
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
      <h1>Routines</h1>
      <RoutinesList routine={routines} syncActivities={syncActivities}/>
      <RoutinesForm syncActivities={syncActivities} />
    </>
  );
}
