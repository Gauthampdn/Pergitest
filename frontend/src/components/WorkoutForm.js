import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext"
import { useNavigate } from "react-router-dom";



const WorkoutForm = () => {

  const navigate = useNavigate();


  const { user } = useAuthContext()

  const [title, setTitle] = useState("")
  const [load, setLoad] = useState("")
  const [reps, setReps] = useState("")
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsSubmitting(true)  // Setting isSubmitting to true before making request
    
    if(!user){
      setError("You must be logged in")
      setIsSubmitting(false)
      return
    }

    const workout = {title, load, reps}

    const response = await fetch("https://mernworkout.onrender.com/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type" : "application/json",
        "Authorization": `Bearer ${user.token}`    // backticks for template string to have variable inside
      }
    })
     
    const json = await response.json()

    setIsSubmitting(false) // Setting isSubmitting back to false after getting response

    if(!response.ok){
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }

    if(response.ok){
      setTitle("")
      setLoad("")
      setReps("")
      setError(null)
      setEmptyFields([])
      console.log("new workout added", json)
    }

    navigate('/');

  }

  return ( 

    <form className="create" onSubmit={handleSubmit}>
      <h3> Add New Workout</h3>

      <label> Exercise Title: </label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : "" }
      />

      <label> Load (lbs):</label>
      <input
        type="text"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes("load") ? "error" : "" }
        />

      <label> Reps:</label>
      <input 
        type="text"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes("reps") ? "error" : "" }
      />

      <button disabled={isSubmitting}> 
        {isSubmitting ? "Loading..." : "Add Workout"} 
      </button>
      { error && <div className="error">{error}</div> }
      
    </form>
   );
}
 
export default WorkoutForm;
