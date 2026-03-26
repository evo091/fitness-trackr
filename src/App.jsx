import { Route, Routes } from "react-router";
import Register from "./auth/Register";
import Login from "./auth/Login";
import ActivitiesPage from "./activities/ActivitiesPage";
import Layout from "./layout/Layout.jsx"
import Error404 from "./Error404.jsx";
import ActivityDetails from "./auth/ActivityDetails.jsx";
import Routines from "./routines/Routines.jsx";

/**
 * Fitness Trackr is a platform where fitness enthusiasts can share their workouts and
 * discover new routines. Anyone can browse the site and make an account, and users with an
 * account will be able to upload and manage their own activities.
 */
export default function App() {
  return (
  <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path = "/activities" element={<ActivitiesPage />}/>
        <Route path = "/register/" element={<Register/>}/>
        <Route path = "/login/" element={<Login/>}/>
        <Route path="/activity/:id" element={<ActivityDetails />}/>
        <Route path ="/routines" element={<Routines />} />
        <Route path="*" element={<Error404 />}/>
      </Route>
    </Routes>
  )
}
