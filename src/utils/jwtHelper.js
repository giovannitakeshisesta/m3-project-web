import decode from 'jwt-decode'

// the function get the token as parameter and checks if is expired, 
// if is valid returns true, / if is expired returns false
export const verifyJWT = (token) => {
  const decodedToken = decode(token)

  return Date.now() <= decodedToken.exp * 1000
}