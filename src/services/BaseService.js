import axios from 'axios'
import { getAccessToken, logout } from '../store/AccessTokenStore';


const createHttp = (useAccessToken = false) => {
  const http = axios.create({
    // baseURL: 'http://localhost:3001/api'
    // baseURL: 'https://ticketeazy.onrender.com/api'
    `${process.env.REACT_APP_API_URL}/api`
  })

  // ------------------------------------------------------
  // interceptors request

  http.interceptors.request.use(
    (request) => {
      if (useAccessToken && getAccessToken()) {

        // meto el token en la cabezera Authorization
        request.headers.common.Authorization = `Bearer ${getAccessToken()}`
      }

      return request
    }
  )

  // ------------------------------------------------------
  // interceptors response
  http.interceptors.response.use(
    (response) => response.data,
    (error) => {

      if (error?.response?.status && [401, 403].includes(error.response.status)) {
        if (getAccessToken()) {
          // delete token
          logout()

          if (window.location.pathname !== '/login') {
            window.location.assign('/login')
          }
        }
      }

      return Promise.reject(error);
    }
  )

  return http
}

export default createHttp