import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext"

// pages & components
import Home from "./pages/Home"
import Login from "./pages/Login";
import Create from "./pages/Create";

function App() {

  const { user } = useAuthContext()


  return (
    <div className="App">

      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route
            path="/"
            element = {user ? <Home/> : <Navigate to= "/login" />}
            />
            <Route
            path="/login"
            element = {!user ? <Login/> :  <Navigate to= "/" />}
            />
            <Route
            path="/create"
            element = {<Create/> }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
