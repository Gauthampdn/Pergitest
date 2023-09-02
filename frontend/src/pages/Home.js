import { useEffect, useState } from "react"
import { useTemplatesContext } from "../hooks/useTemplatesContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import TemplateDetails from "../components/TemplateDetails"
import Sidebar from "../components/Sidebar"

const Home = () => {
  const { templates, dispatch } = useTemplatesContext()
  const { user } = useAuthContext()
  const [currTemplate, setCurrTemplate] = useState(null)


  useEffect(() => {
    const fetchTemplates = async () => {
      const response = await fetch('https://pergiv0-1backend.onrender.com/api/templates', {
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_TEMPLATES', payload: json })
      }

    }

    if (user) {
      fetchTemplates()
    }
  }, [dispatch, user])



  return (
    <div className="home">
      <div className="side">
        {templates && templates.map(template => (
          <Sidebar
            template={template}
            key={template._id}
            onClick={() => setCurrTemplate(template)} // Set the current template when clicked
          />
          
        )
        )}
      </div>

      <div className="templates">
        {currTemplate && <TemplateDetails template={currTemplate} onDeleted={() => setCurrTemplate(null)} />}
      </div>

    </div>
  )
}

export default Home
