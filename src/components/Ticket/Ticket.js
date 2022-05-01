import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteOrder, editIsDone } from '../../services/OrderService';

const Ticket = ({tableInfo,food,drink,createdAt,_id,editTableId}) => {
    const {people, table, urgent, takeAway, waiter } = tableInfo;
    const time = String(Number(createdAt.substring(11,13))+2)+ createdAt.substring(13,16);
    const day = createdAt.substring(0,10);
    const navigate = useNavigate()
    let location = useLocation()
    
    const deleteOrd = (id) => {
        deleteOrder(id)
        .then(()=>navigate('/KitchenWall'))
        .catch((err) => console.log(err) )
    }

    const dishDone = (id,dish) => {
        dish.isDone=!dish.isDone
        // console.log(id,dish.isDone);
        const {type,name}=dish
        editIsDone(id,{ type,name })
        .then((response)=>console.log(response.drink[0].isDone))
        .catch((err)=> console.log(err))
    }

    return (
    <div className='ticket1'>
    {/* ------------------------TABLE INFO------------------------ */}
       <div className="ticketHeader">
            {urgent && <i className="fas fa-exclamation-circle "></i>}

            <div className="frcc">
                <img
                src="images/table_icon_125938.png"
                alt="table"
                className="imgTable"
                />
                <h3>{table}</h3>
            </div>

            <div className="frcc">
                <i className="fas fa-users ms-2"></i>
                <h3>{people}</h3>

                {takeAway && <i className="fas fa-bicycle "></i>}
            </div>
        </div>
 


    {/* --------------------FOOD DRINK ORDERS----------------- */}
        {food.map(dish => {
            return(
                <div key={dish.id} className="ticketBody">
                <div className='d-flex'>
                    <p className='me-3'
                    style={{display: dish.id === "6"||dish.id ==="7" ? "none":null}}
                    >{dish.quantity}</p>
                    <p>{dish.name}</p>
                </div>
                <p className='ticketMessage'>{dish.message}</p>
                </div>                    
            )
        })}

        {drink.map(dish => {
            return(
                <div key={dish.id} className="ticketBody">
                <div className='d-flex'>
                    <p className='me-3'
                    style={{display: dish.id === "6"||dish.id ==="7" ? "none":null}}
                    >{dish.quantity}</p>
                    <p onClick={()=> dishDone(_id,dish)}
                        style={{backgroundColor : dish.isDone ? "red":"green"}}
                    >{dish.name}</p>
                </div>
                <p className='ticketMessage'>{dish.message}</p>
                </div>                    
            )
        })}
    
    
    {/* ------------------------ FOOTER ----------------------- */}
        <div className='ticketFooter'>
            <div className='ticketTimeDay'>
                <div className='ticketTime'>
                    <i className="far fa-clock"></i>
                    <p>{time} </p>
                </div>
                <p>{day}</p>
            </div>   
            <div>
                <p>Waiter: {waiter} </p>
            </div>                     
        </div>

        {location.pathname==='/tables' &&
        <>
        <button className='deleteOrderBtn'
            onClick={()=>deleteOrd(_id) }
        >
            Delete
        </button>

        <button className='btn btn-warning' 
            onClick={()=> editTableId(table,_id)}
        >
            update
        </button>
        </>
        }
     
    </div>
    );
}

export default Ticket;
