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

    return (
        <div>
            {allOrders &&
             allOrders.map(order => {
                 return (
                     <div key={order._id}>
                    <Comandasingola {...order}/>
                     </div>
                 )
             })
            }
        </div>
    );
}

export default Comanda;
