import { useState, useEffect } from "react";
import GoogleButton from 'react-google-button';
import { useAuthContext } from "../hooks/useAuthContext";



const Login = () => {

  const { dispatch } = useAuthContext()


  const handleButtonClick = () => {
    window.location.href = "http://localhost:4000/auth";
  };


  useEffect(() => {
    const fetchUser = async () => {
      console.log("fetching user");
        const response = await fetch('http://localhost:4000/auth/googleUser', {
          credentials: 'include'
        });

        const json = await response.json();
        console.log(json);

        if (response.ok) {
          dispatch({type : "LOGIN", payload: json})
        }

    };

    fetchUser();
  }, []);


  return (
    <div className="login">
      <div className="login-image">
        <img src="/purpfeathers.jpg" alt="background"/>
      </div>
      <div className="login-content">
        <h1>Login</h1>
        <GoogleButton onClick={handleButtonClick} />
      </div>
    </div>
  );
}

export default Login;