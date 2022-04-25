import createHttp from './BaseService'

const http = createHttp(true)

//---------------------- ORDERS ----------------------
// create order
export const createOrder = (data) => http.post('/orders/create',data)

// edit order
export const editOrder = (id, order) => http.patch(`/orders/${id}`, order)

// delete order
export const deleteOrder = (id) => http.delete(`/orders/${id}`)


//---------------------- HOLDERS ----------------------
// get  the holders ()
export const getHolders = () => http.get('/holders')


// update  the holders ()
export const putHolders = (data) => http.put(`/holders`,data)


