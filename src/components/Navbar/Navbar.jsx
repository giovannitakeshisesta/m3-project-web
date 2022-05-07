import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { logout } from '../../store/AccessTokenStore'

const Navbar = () => {
  const { user } = useAuthContext();
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <h3>Ticketeazy</h3>
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
              <div className="d-flex">     
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
              </div>
            ) : (   
              <>
              {/* ----  SHOW WHEN IS LOGGED IN   ---- */}
                <div className="d-flex">
                  <li className="nav-item">
                    <NavLink className="nav-link"
                      to="/menu">
                      Menu
                    </NavLink>
                  </li>
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
                </div>
                <li>
                  <i className="fa-solid fa-right-from-bracket nav-link" 
                      onClick={logout}>
                  </i>
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
