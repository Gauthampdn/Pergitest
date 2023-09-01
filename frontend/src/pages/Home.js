import { useEffect, useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import WorkoutDetails from "../components/WorkoutDetails"
import Sidebar from "../components/Sidebar"

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()
  const [currWorkout, setCurrWorkout] = useState(null)


  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('https://mernworkout.onrender.com/api/workouts', {
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json })
      }
    }

    if (user) {
      fetchWorkouts()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="side">
        {workouts && workouts.map(workout => (
          <Sidebar
            workout={workout}
            key={workout._id}
            onClick={() => setCurrWorkout(workout)} // Set the current workout when clicked
          />
        ))}
      </div>

      <div className="workouts">
        {currWorkout && <WorkoutDetails workout={currWorkout} onDeleted={() => setCurrWorkout(null)} />}
      </div>
    </div>
  )
}

export default Home
