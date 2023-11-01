import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const TemplateForm = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [icon, setIcon] = useState("");
  const [templateItems, setTemplateItems] = useState([]);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedType, setSelectedType] = useState(""); // For dropdown selection

  const handleDropdownChange = (e) => {
    const type = e.target.value;
    if (type) {
      const newItem = { type, context: type === "selector" ? [] : "" };
      setTemplateItems((prevItems) => [...prevItems, newItem]);
      setSelectedType(""); // Reset the dropdown
    }
  };
  const handleItemChange = (index, value) => {
    const updatedItems = [...templateItems];
    updatedItems[index].context = value;
    setTemplateItems(updatedItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!user) {
      setError("You must be logged in");
      setIsSubmitting(false);
      return;
    }

    const templateData = {
      title,
      description,
      image,
      icon,
      template: templateItems,
      user_id: user.id // Assuming user object has an id property
    };

    const response = await fetch(`${process.env.REACT_APP_API_BACKEND}/api/templates`, {
      credentials: 'include',
      method: "POST",
      body: JSON.stringify(templateData),
      headers: {
        "Content-Type": "application/json",
      },
    });


    const json = await response.json();
    setIsSubmitting(false);

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setTitle("");
      setDescription("");
      setImage("");
      setIcon("");
      setTemplateItems([]);
      setError(null);
      setEmptyFields([]);
      console.log("new template added", json);
      navigate('/');
    }
  };

  const LiveTemplatePreview = () => {
    return (
      <div className="live-template-preview">
        <h4 className="preview-text">Live Preview:</h4>
        <hr/>
        <h1>{title}</h1>
        <h2>{description}</h2>
        {templateItems.map((item, index) => {
          switch (item.type) {
            case "header":
              return <h3 key={index}>{item.context}</h3>;
            case "textbox":
              return <textarea key={index} placeholder={item.context} readOnly />;
            case "selector":
              return (
                <div key={index}>
                  {item.context.map((option, idx) => (
                    <span key={idx} className="tag">
                      {option}
                    </span>
                  ))}
                </div>
              );
            default:
              return null;
          }
        })}
      </div>
    );
  };  

  return (
    <div className="full-create">
    <form className="create" onSubmit={handleSubmit}>
      <a href="https://pergi.app" className="backbutton">
        <h3>← Go Back</h3>
      </a>

      
      <h3>Add New Template</h3>

      <label>Template Title:</label>
      <textarea
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Description:</label>
      <textarea
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />

      <label>Image URL:</label>
      <textarea
        type="text"
        onChange={(e) => setImage(e.target.value)}
        value={image}
      />

      <label>Icon:</label>
      <textarea
        type="text"
        onChange={(e) => setIcon(e.target.value)}
        value={icon}
      />

      {templateItems.map((item, index) => (
        <div key={index}>
          {item.type === "header" && (
            <>
              <label>Header:</label>
              <textarea
                type="text"
                value={item.context}
                onChange={(e) => handleItemChange(index, e.target.value)}
              />
            </>
          )}
          {item.type === "textbox" && (
            <>
              <label>Textbox Placeholder:</label>
              <textarea
                type="text"
                value={item.context}
                onChange={(e) => handleItemChange(index, e.target.value)}
              />
            </>
          )}
          {item.type === "selector" && (
            <>
              <label>Selector Options (comma separated):</label>
              <textarea
                type="text"
                value={item.context.join(',')}
                onChange={(e) => handleItemChange(index, e.target.value.split(','))}
              />
            </>
          )}
        </div>
      ))}

      <div>
        <select
          value={selectedType}
          onChange={handleDropdownChange}
          className="dropdown"  // Use the CSS class
        >
          <option value="">Add Item...</option>
          <option value="header">Header</option>
          <option value="textbox">Textbox</option>
          <option value="selector">Selector</option>
        </select>
      </div>

      <button disabled={isSubmitting}>
        {isSubmitting ? "Loading..." : "Add Template"}
      </button>
      {error && <div className="error">{error}</div>}

    </form>
    <LiveTemplatePreview/>
    </div>
  );
};

export default TemplateForm;
