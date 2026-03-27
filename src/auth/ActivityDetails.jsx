import { useParams, useNavigate } from "react-router"
import { getAnActivity } from "../api/activities";
import { deleteAnActivity } from "../api/activities";
import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "./AuthContext";
import { ToastContainer, toast } from "react-toastify";

export default function ActivityDetails() {
    const [activity, setActivity] = useState();
    const {id} = useParams();
    const nav = useNavigate();
    const {token} = useAuth();
    
    useEffect(() => {
        const fetchActivity = async () => {
            setActivity(await getAnActivity(id));
        }
        fetchActivity();
    },[id]);

    const handleClick = async () => {
        try {
            await deleteAnActivity(token, id)
        nav("/activities")
        } catch(error) {
            toast.error(error.message)
        }
            
    }

    return (
        <>
            {activity && <>
            <h1>{activity.name}</h1>
            <h1>{activity.description}</h1>
            <button onClick={handleClick}>Delete Activity</button>
            <ToastContainer/>
            </>}
        </>
    )

}