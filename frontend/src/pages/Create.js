import TemplateForm from "../components/TemplateForm";
import { Link } from "react-router-dom";

const Create = () => {
   return (
      <div>
         <Link to="https://pergi.app">
            <h1 className="centered-header"> go back </h1>
         </Link>
         <TemplateForm />
      </div>

   );
}

export default Create;