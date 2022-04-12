import { createContext, useState, useContext, useEffect } from 'react'
import { setToken, getAccessToken, logout } from '../store/AccessTokenStore'
import { getCurrentUser } from '../services/UsersService'
import { verifyJWT } from '../utils/jwtHelper'

const AuthContext = createContext()

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState()

  // isAuthenticationFetched === is the authentication process completed ??
  const [isAuthenticationFetched, setIsAuthenticationFetched] = useState(false)

  //--------------------------------------------------------------------
  // this function take as parameter: a token (response.access_token,)
  // and a callback (() => navigate(from, { replace: true }))
  // when is called, sets the token in local storage, 
  // finallly calls the getUser function passing the callback
  const login = (token, navigateCb) => {
    setToken(token)

    getUser(navigateCb)
  }

  //--------------------------------------------------------------------
  // this function sends ans API request: User.findById(req.currentUser) 
  // stores the result (user id,email.name...) in "user"
  // declares the authentication process completed
  // executes the callback: redirects to "the page you were before" or to "/profile"
  const getUser = (cb) => {
    getCurrentUser()   
      .then(user => {        
        setUser(user)
        setIsAuthenticationFetched(true) // the authentication process is completed

        cb && cb()
      })
  }

  //--------------------------------------------------------------------
  useEffect(() => {
    // if there is a token in local storage:
    if (getAccessToken()) {
      // if the token is expired => log out
      if ( !verifyJWT(getAccessToken()) ) {
        logout()
      } 
      // if the token is valid => getUser() & setUser()
      else {
        getUser()
      }
    }
    // if there is NOT a token in local storage: the authentication process is completed
    else {
      setIsAuthenticationFetched(true)
    }
  }, [])


  //--------------------------------------------------------------------
  const value = {
    user,
    isAuthenticationFetched,
    login
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext