import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

//date-fns
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { useAuthContext } from "../hooks/useAuthContext"



const WorkoutDetails = ({workout,  onDeleted }) => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()



  const handleClick = async () => {

    if(!user){
      return
    }

    const response = await fetch("https://mernworkout.onrender.com/api/workouts/" + workout._id, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${user.token}`    // backticks for template string to have variable inside
      }
    })

    const json = await response.json()

    if(response.ok){
      dispatch({type: "DELETE_WORKOUT", payload: json})
      if (onDeleted) onDeleted(); // Call the passed callback

    }


  }

  return ( 

    <div className="workout-full">
      <h4>{workout.title}</h4>
      <p><strong> Load ( lbs ) : </strong> {workout.load} </p>
      <p><strong> Reps: </strong> {workout.reps} </p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true })} </p>
      <span className="material-symbols-outlined" onClick = {handleClick}> delete </span>
    </div>

   );
}
 
export default WorkoutDetails;