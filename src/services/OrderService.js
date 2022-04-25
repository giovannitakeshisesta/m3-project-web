import createHttp from './BaseService'

const http = createHttp(true)



// --------ORDERS-------------
// create order
export const createOrder = (data) => http.post('/orders/create',data)

// edit order
export const editOrder = (id, order) => http.patch(`/orders/${id}`, order)


//-----HOLDERS-----------

// get  the holders ()
export const getHolders = () => http.get('/holders')



// update  the holders ()
export const putHolders = (data) => http.put(`/holders`,data)




//------------to be cancelled
// add the order to hold1
// export const postOrder = (data) => http.post('/orders',data)

// get the new orders
// export const getOrders = () => http.get('/orders')
