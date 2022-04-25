import createHttp from './BaseService'

const http = createHttp(true)

export const addItemMenu = (data) => http.post('/menu', data)