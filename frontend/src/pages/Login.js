import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { JellyTriangle } from '@uiball/loaders'



const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, error, isLoading } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)

  }

  return (

    <form className="login" onSubmit={handleSubmit}>
      <img src="/PergiLogopurp.png" alt="Description" className="LogoImage"></img>

      <h3> Log in </h3>
      <label> Email: </label>
      <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />

      <label> Password: </label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />

      <button disabled={isLoading}>
        {isLoading ? <JellyTriangle
          size={20}
          speed={1.75}
          color="white"
        /> : 'Log in'}
      </button>
      {error && <div className="error">{error}</div>}
    </form>

  );
}

export default Login;