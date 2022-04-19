import React, { useEffect, useState } from 'react';
import { getOrders } from '../../services/OrderService';
import Comandasingola from './ComandaSingola';

const Comanda = () => {

    const [allOrders, setAllOrders] = useState([])
    useEffect(() => {
        getOrders()
        .then(response => setAllOrders(response))
        .catch(err => console.log(err))
    }, []);

    //if (allOrders)  console.log(allOrders[0].food) 
    return (
        <div>
            {allOrders &&
             
             allOrders.map(order => {
                 return (
                     <div key={order._id}>
                    {/* <pre>XXXXXX{JSON.stringify(order.food, null, 1)}</pre> */}
                    <Comandasingola {...order}/>
                    <hr/>
                     </div>
                 )
             })
            
            }
        </div>
    );
}

export default Comanda;
