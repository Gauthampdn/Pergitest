import { useTemplatesContext } from "../hooks/useTemplatesContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

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

  const handleConcatenateAndLog = () => {
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
    console.log(concatenatedText.trim());
    setConcatenatedStrings(prevStrings => [...prevStrings, concatenatedText.trim()]);
  };

  return (
    <div className="template-container">
      <div className="template-full">
        <h4>{template.title}</h4>
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

        <button onClick={handleConcatenateAndLog}>Log Text</button>
        <span className="material-symbols-outlined" onClick={handleClick}> delete </span>
      </div>

      <div className="concatenated-box">
        {concatenatedStrings.map((str, index) => (
          <div key={index}>{str}</div>
        ))}
      </div>

    </div>
  );
}

export default TemplateDetails;
