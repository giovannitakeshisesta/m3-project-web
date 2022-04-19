import createHttp from './BaseService'

const http = createHttp(true)

export const getCurrentUser = () => http.get('/users/me')

export const getUsers = () => http.get('/users')

export const getUserDetails = (id) => http.get(`/users/${id}`)