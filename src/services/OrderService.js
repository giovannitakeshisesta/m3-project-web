import createHttp from './BaseService'

const http = createHttp(true)

// post the order
export const postOrder = (data) => http.post('/orders',data)

// get all the orders
export const getOrders = () => http.get('/orders')


