import { Link } from "react-router";

export default function RoutineList({ routine }) {

    return (
      <>
        <ul>
          {routine.map((routine) => (
            <li key={routine.id}>
              <Link to = {"/routines/" + routine.id}>
                {routine.name}
              </Link>
            </li>
          ))}
        </ul>
    </>
    );
  }