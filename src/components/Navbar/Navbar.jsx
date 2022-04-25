import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { logout } from '../../store/AccessTokenStore'

const Navbar = () => {
  const { user } = useAuthContext();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Restaurant
        </NavLink>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {!user ? (
              <>     
              {/* ----  SHOW WHEN IS LOGGED OUT  ---- */}
                <li className="nav-item">
                  <NavLink className="nav-link"  
                    to="/login">
                    Login
                  </NavLink>
                </li>
                
                <li className="nav-item">
                  <NavLink className="nav-link"  
                    to="/register">
                    Register
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link"  
                    to="/drag">
                    Drag
                  </NavLink>
                </li>


      
              </>
            ) : (   
              <>
              {/* ----  SHOW WHEN IS LOGGED IN   ---- */}
                {/* <li className="nav-item">
                  <NavLink className="nav-link"  
                    to="/profile"> 
                    Profile
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link"
                    to="/favourites" > 
                    Favourites
                  </NavLink>
                </li> */}

                <li className="nav-item">
                  <NavLink className="nav-link"  
                    to="/KitchenWall">
                    Kitchen Wall
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link"  
                    to="/tables">
                    Tables
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link"  
                    to="/menuForm">
                    menuForm
                  </NavLink>
                </li>

                <li className="nav-link" onClick={logout}>
                   Logout                  
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link"  
                    to="/todo">
                    to do 
                  </NavLink>
                </li>

              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
