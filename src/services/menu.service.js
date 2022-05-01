import createHttp from './BaseService'

const http = createHttp(true)

export const addItemMenu = (data) => http.post('/menu', data)

export const getMenu = () => http.get('/menu')
export const getMenuDetails  = (id) => http.get(`/menu/${id}`)
export const editMenuDetails = (id,data) => http.patch(`/menu/${id}`,data)
export const deleteMenuItem = (id) => http.delete(`/menu/${id}`)