const { default: mongoose } = require("mongoose")
const Template = require("../models/templateModel")

// get all templates

const getTemplates = async (req, res) => {

  const user_id = req.user._id;

  // Define the IDs you always want to include
  const alwaysIncludeIds = [
    mongoose.Types.ObjectId("64f2b4688a8c5d7413766ade"),
    // mongoose.Types.ObjectId("64f2b4688a8c5d7413766adf")
  ];

  // Modify the query to either match the user_id or one of the alwaysIncludeIds
  const templates = await Template.find({
    $or: [
      { user_id },
      { _id: { $in: alwaysIncludeIds } }
    ]
  }).sort({ createdAt: -1 });

  res.status(200).json(templates);
}

// get a single template

const getTemplate = async (req, res) => {

  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "No such Template and invalid ID"})
  }

  const template = await Template.findById(id)

  if(!template){
    return res.status(404).json({error: "No such Template"})
  }
  
  res.status(200).json(template)
}


// create a new template

const createTemplate = async (req, res) => {
  const { title, description, image, icon, template } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!template || template.length === 0) {
    emptyFields.push("template");
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill in all fields", emptyFields });
  }

  // Adding document to DB
  try {
    const user_id = req.user._id;
    const newTemplate = await Template.create({
      title,
      description,
      image,
      icon,
      template,
      user_id
    });

    res.status(200).json(newTemplate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = createTemplate;


// delete a template
const deleteTemplate = async (req, res) => {

  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "No such Template and invalid ID"})
  }

  const template = await Template.findByIdAndDelete(id)

  if(!template){
    return res.status(404).json({error: "No such Template"})
  }

  res.status(200).json(template)

}


const updateTemplate = async (req, res) => {

  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "No such Template and invalid ID"})
  }


  const template = await Template.findOneAndUpdate({ _id: id}, {
    ...req.body
  })

  if(!template){
    return res.status(404).json({error: "No such Template"})
  }

  res.status(200).json(template)

}


module.exports = {
  getTemplate,
  getTemplates,
  createTemplate,
  deleteTemplate,
  updateTemplate
}