import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuthContext } from "../contexts/AuthContext"

const ProtectedRoute = () => {
  const { user, isAuthenticationFetched } = useAuthContext()
  let location = useLocation()


  // if the authentication process is completed && !user  DUDA
  // redirect to /login storing in state the page where you come from 
  if (isAuthenticationFetched && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return (
    <Outlet />
  )
}

export default ProtectedRoute