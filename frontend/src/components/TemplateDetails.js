import { useTemplatesContext } from "../hooks/useTemplatesContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';

const TemplateDetails = ({ template, onDeleted }) => {
  const { dispatch } = useTemplatesContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch("https://pergiv0-1backend.onrender.com/api/templates/" + template._id, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_TEMPLATE", payload: json });
      if (onDeleted) onDeleted();
    }
  };



  const [textboxValues, setTextboxValues] = useState([]);
  const [selectedTagsList, setSelectedTagsList] = useState([]);
  const [concatenatedStrings, setConcatenatedStrings] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    if (template.convos) {
      setConcatenatedStrings(template.convos);
    } else {
      setConcatenatedStrings([]);
    }
  }, [template]);
  

  const handleTagClick = (tag, selectorIndex) => {
    setSelectedTagsList((prevTagsList) => {
      const updatedTagsList = JSON.parse(JSON.stringify(prevTagsList));
      const currentTags = updatedTagsList[selectorIndex] || [];
      if (currentTags.includes(tag)) {
        currentTags.splice(currentTags.indexOf(tag), 1);
      } else {
        currentTags.push(tag);
      }
      updatedTagsList[selectorIndex] = currentTags;
      return updatedTagsList;
    });
  };








  const concatenateText = () => {
    let concatenatedText = '';
    template.template.forEach((item, index) => {
      switch (item.type) {
        case "header":
          concatenatedText += item.context + ' ';
          break;
        case "textbox":
          concatenatedText += (textboxValues[index] || '') + ' ';
          break;
        case "selector":
          const sortedSelectedTags = item.context.filter(tag => selectedTagsList[index] && selectedTagsList[index].includes(tag));
          concatenatedText += sortedSelectedTags.join(', ') + ' ';
          break;
        default:
          break;
      }
    });
    return concatenatedText.trim();
  };



  const updateConvo = async (concatenatedText) => {
    const newConvo = { prompt: concatenatedText, response: "RESPONSE" };

    // Use concatenatedStrings directly
    const updatedConvos = [...concatenatedStrings, newConvo];

    const response = await fetch(`https://pergiv0-1backend.onrender.com/api/templates/${template._id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify({ convos: updatedConvos })
    });

    if (response.ok) {
        const updatedTemplate = await response.json();
        console.log(updatedTemplate);
        dispatch({ type: "UPDATE_TEMPLATE", payload: updatedTemplate });
        setConcatenatedStrings(updatedConvos);
    } else {
        console.error("Failed to save convo");
    }
};



  const handleConcatenateAndLog = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const concatenatedText = concatenateText();
    await updateConvo(concatenatedText);
    setIsSubmitting(false);
  };



  const handleResetConvo = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://pergiv0-1backend.onrender.com/api/templates/${template._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      },
      body: JSON.stringify({ convos: [] })
    });

    if (response.ok) {
      const updatedTemplate = await response.json();
      dispatch({ type: "UPDATE_TEMPLATE", payload: updatedTemplate });
      setConcatenatedStrings([]);
    } else {
      console.error("Failed to save convo");
    }
  };



  return (
    <div className="template-container">
      <div className="template-full">
        <h1>{template.title}</h1>
        <h2>{template.description}</h2>
        <p>{formatDistanceToNow(new Date(template.createdAt), { addSuffix: true })}</p>

        {template.template.map((item, index) => {
          switch (item.type) {
            case "header":
              return <h3 key={index}>{item.context}</h3>;
            case "textbox":
              return (
                <input
                  key={index}
                  type="text"
                  placeholder={item.context}
                  value={textboxValues[index] || ''}
                  onChange={(e) => {
                    const newValues = [...textboxValues];
                    newValues[index] = e.target.value;
                    setTextboxValues(newValues);
                  }}
                />
              );
            case "selector":
              return (
                <div key={index}>
                  {item.context.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className={`tag ${selectedTagsList[index] && selectedTagsList[index].includes(tag) ? 'selected' : ''}`}
                      onClick={() => handleTagClick(tag, index)}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              );
            default:
              return null;
          }
        })}

        <button disabled={isSubmitting} onClick={handleConcatenateAndLog}>{isSubmitting ? "Loading..." : "Submit"}</button>
        <span className="material-symbols-outlined" onClick={handleClick}> delete </span>
      </div>

      <div className="concatenated-box">
        <span className="material-symbols-outlined" onClick={handleResetConvo}> refresh </span>
        {concatenatedStrings.map((convo, index) => (
          <div key={index}>
            <h4>Prompt:</h4>
            <ReactMarkdown children={convo.prompt} />
            <h4>Response:</h4>
            <ReactMarkdown children={convo.response} />
          </div>
        ))}


      </div>



    </div>
  );
}

export default TemplateDetails;
