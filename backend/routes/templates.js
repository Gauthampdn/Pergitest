const express = require("express")
const router = express.Router()

const { 
  
  createTemplate,
  getTemplate,
  getTemplates,
  deleteTemplate,
  updateTemplate

} = require("../controllers/templateController")

const requireAuth = require("../middleware/requireAuth")

router.use(requireAuth) // requires authentication and then calls next. if no authentication then it throws an error

// to GET all templates
router.get("/", getTemplates)

// to GET a single template
router.get("/:id", getTemplate)

// POST a template
router.post("/", createTemplate)

// DELETE a template
router.delete("/:id", deleteTemplate)

// UPDATE a template
router.patch("/:id", updateTemplate)




module.exports = router