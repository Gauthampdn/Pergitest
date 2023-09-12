import { useEffect, useState } from "react";
import { useTemplatesContext } from "../hooks/useTemplatesContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import TemplateDetails from "../components/TemplateDetails";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const { templates, dispatch } = useTemplatesContext();
  const { user } = useAuthContext();
  const [currTemplate, setCurrTemplate] = useState(null);
 // const [refetch, setRefetch] = useState(false); // New state variable


  useEffect(() => {
    const fetchTemplates = async () => {
      const response = await fetch('https://pergiv0-1backend.onrender.com/api/templates', {
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_TEMPLATES', payload: json });
      }
    };

    if (user) {
      fetchTemplates();
    }

  }, [dispatch, user]); // had 'refetch' as a dependency too


  const handleTemplateClick = (template) => {
    setCurrTemplate(template);
   // setRefetch(!refetch); // Toggle refetch state whenever a template is clicked
  };

  return (
    <div className="home">
      <div className="side">
        {templates && templates.map(template => (
          <Sidebar
            template={template}
            key={template._id}
            onClick={() => handleTemplateClick(template)}
          />
        ))}
      </div>

      <div className="templates">
        {currTemplate && <TemplateDetails template={currTemplate} onDeleted={() => setCurrTemplate(null)} />}
      </div>
    </div>
  );
}

export default Home;
