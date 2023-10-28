import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";



const Login = () => {

  const { dispatch } = useAuthContext()

  const handleButtonClick = () => {
    window.location.href = `${process.env.REACT_APP_API_BACKEND}/auth`;
  };

  
  useEffect(() => {
    const fetchUser = async () => {
      console.log("fetching user");


      const response = await fetch("https://bcknd.pergi.app/auth/googleUser", {
        credentials: 'include',
        mode: 'cors'
      });

      console.log("fetched user:");

  
      const json = await response.json();
      console.log(json);
  
      if (response.ok) {
        dispatch({ type: "LOGIN", payload: json })
      }
    };
  
    fetchUser();
  }, [dispatch]);
  

  return (
    <div className="login">
      <div className="login-image">
        <img src="/gradwax.jpg" alt="background" />
      </div>
      <div className="login-content">
        <h1>WELCOME TO PERGI!</h1>

        <img onClick={handleButtonClick} src="/glog.png" alt="google login" />

        <img src="/PergiLogopurp.png" alt="logo"/>

        
      </div>
    </div>
  );
}

export default Login;