import { useParams, useNavigate } from "react-router"
import { getARoutine } from "../api/routines";
import { deleteARoutine } from "../api/routines";
import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import Sets from "./Sets";
import { deleteASet } from "../api/routines";


export default function RoutineDetails() {
    const [routines, setRoutines] = useState();
    const {id} = useParams();
    const nav = useNavigate();
    const {token} = useAuth();

    useEffect(() => {
        const fetchRoutine = async () => {
            setRoutines(await getARoutine(id));
        }
        fetchRoutine();
    },[id]);

    const syncRoutine = async () => {
        const updatedRoutine = await getARoutine(id);
        setRoutines(updatedRoutine);
    };

    const handleClick = async () => {
        try {
            await deleteARoutine(token, id)
        nav("/activities")
        } catch(error) {
            toast.error(error.message)
        }
            
    }

    const handleClickSets = async (setId) => {
        try {
            await deleteASet(token, setId)
            await syncRoutine();
        } catch(error) {
            toast.error(error.message)
        }
    };
    
    return (
        <>
            {routines && <>
            <h1>{routines.name}</h1>
            <h1>{routines.description}</h1>
            <h2>{routines.goal}</h2>
            <div>
              <h3>Sets:</h3>
              {routines.sets.length === 0 ? (toast("Add some sets to this routine!")
              ) : (
              <ul>
                {routines.sets && routines.sets.map((set, index) => (
                  <li key={set.id || index}>
                    {set.name} - {set.count} reps
                    <button onClick={() => handleClickSets(set.id)}>Delete Set</button>
                  </li>
                ))}
              </ul>)}
            </div>
            <h2>{routines.creatorName}</h2>
            <Sets routineId={id} setCreated={syncRoutine} />
            <button onClick={handleClick}>Delete Routine</button>
            <ToastContainer/>
            </>}
        </>
    )

}