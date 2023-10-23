import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";


const Navbar = () => {

  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (

    <header>
      <div className="container">

        <nav>
          {user &&
            (<div>
              <img src={user.picture} alt="" className="user-image" />
              <span>Welcome, {user.name}!</span>
              <button onClick={handleClick}> Log Out</button>

              <Link to="/create">Create</Link>
            </div>
            )
          }
          {!user &&
            (<div>
            </div>)
          }
        </nav>
      </div>
    </header>

  );
}

export default Navbar;