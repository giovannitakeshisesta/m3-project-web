import createHttp from './BaseService'

const http = createHttp(true)

// post the order
export const postOrder = (data) => http.post('/orders',data)

// get the new orders
export const getOrders = () => http.get('/orders')


// get  the holders ()
export const getHolders = () => http.get('/holders')



// update  the holders ()
export const putHolders = (data) => http.put(`/holders`,data)