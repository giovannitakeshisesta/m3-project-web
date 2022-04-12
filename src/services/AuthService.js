import createHttp from './BaseService'

const http = createHttp(false)

export const loginRequest = (data) => http.post('/login', data)

export const register = (data) => http.post('/users', data)