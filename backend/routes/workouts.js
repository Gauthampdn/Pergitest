const express = require("express")
const router = express.Router()

const { 
  
  createWorkout,
  getWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout

} = require("../controllers/workoutController")

const requireAuth = require("../middleware/requireAuth")

router.use(requireAuth) // requires authentication and then calls next. if no authentication then it throws an error

// to GET all workouts
router.get("/", getWorkouts)

// to GET a single workout
router.get("/:id", getWorkout)

// POST a workout
router.post("/", createWorkout)

// DELETE a workout
router.delete("/:id", deleteWorkout)

// UPDATE a workout
router.patch("/:id", updateWorkout)




module.exports = router