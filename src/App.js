import { Routes, Route} from "react-router-dom";
import ProtectedRoute from "./guards/ProtectedRoute";
import { useAuthContext } from "./contexts/AuthContext";
import './styles/app.scss'

// views  & components
import Register     from "./views/Register/Register";
import Login        from "./views/Login/Login";
import Profile      from "./views/Profile/Profile";
import Home         from "./views/Home/Home";
import KitchenWall  from "./views/KitchenWall/KitchenWall";
import Tables       from "./views/Tables/Tables";
import Menu         from "./views/Menu/Menu";
import Navbar       from "./components/Navbar/Navbar";
import TakeOrder    from "./components/TakeOrder/TakeOrder";
import MenuDetails  from "./components/MenuDetails.js/MenuDetails";

// prueba
function App() {
  const { isAuthenticationFetched } = useAuthContext()
  
  return (
    <div className="">
      <Navbar />
      <div className="">
        {!isAuthenticationFetched ? (
          <div className="spinner-border spinner" role="status">
            <p>Loading...</p>
          </div>
        ) : (
          <Routes>
            <Route path="/"            element={<Home />} />
            <Route path="register"     element={<Register />} />
            <Route path="login"        element={<Login />} />

            <Route path="/"            element={<ProtectedRoute/>} >
              <Route path="profile"    element={<Profile />} />
              <Route path="KitchenWall"  element={<KitchenWall />} />
              <Route path="takeOrder"    element={<TakeOrder />} />
              <Route path="tables"       element={<Tables />} />
              <Route path="menu"         element={<Menu />} />
              <Route path="menu/:id"     element={<MenuDetails />} />
            </Route>
          </Routes>
        )}
      </div>
    </div>
  );
}

export default App;
