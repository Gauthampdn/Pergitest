const { default: mongoose } = require("mongoose")
const Template = require("../models/templateModel")

// get all templates

const getTemplates = async (req, res) => {  // DONE

  const user_id = req.user._id

  const templates = await Template.find({user_id}).sort({createdAt: -1})

  res.status(200).json(templates)
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
  const { title, description, image, icon, template, convos } = req.body;

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
      convos,
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
  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "No such Template and invalid ID"});
  }

  const existingTemplate = await Template.findById(id);
  if(!existingTemplate){
    return res.status(404).json({error: "No such Template"});
  }

  const updatedTemplateData = {
    ...req.body
  };

  const updatedTemplate = await Template.findByIdAndUpdate(id, updatedTemplateData, { new: true });

  res.status(200).json(updatedTemplate);
};




module.exports = {
  getTemplate,
  getTemplates,
  createTemplate,
  deleteTemplate,
  updateTemplate
}