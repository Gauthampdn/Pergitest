import { useEffect } from "react";
import GoogleButton from 'react-google-button';
import { useAuthContext } from "../hooks/useAuthContext";



const Login = () => {

  const { dispatch } = useAuthContext()

  const handleButtonClick = () => {
    window.location.href = `${process.env.REACT_APP_API_BACKEND}/auth`;
  };
  
  useEffect(() => {
    const fetchUser = async () => {
      console.log("fetching user");


      const response = await fetch("http://pergiv0-1backend.onrender.com/auth/googleUser", {
        credentials: 'include'
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
        <img src="/castle.png" alt="background" />
      </div>
      <div className="login-content">
        <h1>Login/Signup to Pergi!</h1>
        <GoogleButton
          type="dark"
          onClick={handleButtonClick}
        />
      </div>
    </div>
  );
}

export default Login;