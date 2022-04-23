import { Routes, Route} from "react-router-dom";
import './styles/app.scss'
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./guards/ProtectedRoute";
import { useAuthContext } from "./contexts/AuthContext";


// views
import Register from "./views/Register/Register";
import Login from "./views/Login/Login";
import Profile from "./views/Profile/Profile";
import Favourites from "./views/Favourites/Favourites";
import Home from "./views/Home/Home";
import Drag from "./views/Drag/Drag";
import KitchenWall from "./views/KitchenWall/KitchenWall";
import Tables from "./views/Tables/Tables";
import TakeOrder from "./views/TakeOrder/TakeOrder";
import UserDetails from "./Users/User.Details";
import Todo from "./views/Todo";


function App() {
  const { isAuthenticationFetched } = useAuthContext()
  
  return (
    <div className="">
      <Navbar />

      <div className="ms-3 me-3">
        {!isAuthenticationFetched ? (
          <p>Loading...</p>
        ) : (
          <Routes>
            <Route path="/"            element={<Home />} />
            <Route path="drag"         element={<Drag />} />
            <Route path="drag"         element={<Drag />} />
            <Route path="KitchenWall"  element={<KitchenWall />} />
            <Route path="takeOrder"    element={<TakeOrder />} />
            <Route path="todo"         element={<Todo />} />
            <Route path="tables"       element={<Tables />} />

            <Route path="register"     element={<Register />} />
            <Route path="login"        element={<Login />} />

            <Route path="/"            element={<ProtectedRoute/>} >
              <Route path="profile"    element={<Profile />} />
              <Route path="favourites" element={<Favourites />} />
              <Route path="users/:id"  element={<UserDetails/>} />
              

            </Route>
          </Routes>
        )}
      </div>
    </div>
  );
}

export default App;
