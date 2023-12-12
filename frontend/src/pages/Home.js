import { useEffect, useState } from "react";
import { useTemplatesContext } from "../hooks/useTemplatesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";


// components
import TemplateDetails from "../components/TemplateDetails";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Home = () => {
  const navigate = useNavigate();

  const { templates, dispatch } = useTemplatesContext();
  const { user } = useAuthContext();
  const [currTemplate, setCurrTemplate] = useState(null);
  // const [refetch, setRefetch] = useState(false); // New state variable


  useEffect(() => {
    const fetchTemplates = async () => {
      console.log("fetching templates")
      const response = await fetch(`${process.env.REACT_APP_API_BACKEND}/api/templates`, {
        credentials: 'include'
      });


      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_TEMPLATES', payload: json });
        if (json.length > 0) {
          setCurrTemplate(json[0]);
        }
      }
    };

    if (user) {
      fetchTemplates();
    }

  }, [dispatch, user]);


  const handleTemplateClick = (template) => {
    setCurrTemplate(template);
    console.log(template)
  };

  const handleBackClick = () => {
    navigate('/library');
  };

  return (
    <div className="home">
      <div className="side side-scrollable">
        <Link to="/about">
          <h1 className="centered-header">Pergi</h1>
        </Link>
        <a onClick={handleBackClick} className="centered-para">The Gallery... ↗</a>

        <Navbar />

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
        {!currTemplate && <h1 className="emptypage"> select or create a template </h1>}

      </div>
    </div>
  );
}

export default Home;
