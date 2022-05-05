import React from 'react';
import { HashRouter, useLocation, useNavigate } from 'react-router-dom';
import { deleteOrder, editIsDone } from '../../services/OrderService';
import TicketBody from './TicketBody';

const Ticket = ({tableInfo,food,drink,createdAt,_id,editTableId, getHOLDERS}) => {
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
        const {type,name}=dish
        editIsDone(id,{ type,name })
        .then((response)=>{
            getHOLDERS && getHOLDERS()
        })
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
            return (
            dish.course == 1 && (
                <TicketBody key={dish.id} dish={dish} dishDone={dishDone} _id={_id} />
            ))
        })}

        {food.some(dish => dish.course===2) &&
        <>
            <hr />
            {food.map(dish => {
                return (
                dish.course == 2 && (
                    <TicketBody key={dish.id} dish={dish} dishDone={dishDone} _id={_id} />
                ))
            })}
        </>
        }

        {drink.map(dish => {
            return (
            dish.course == 1 && (
                <TicketBody key={dish.id} dish={dish} dishDone={dishDone} _id={_id} />
            ))
        })}

        {drink.some(dish => dish.course===2) &&
        <>
            <hr />
            {food.map(dish => {
                return (
                dish.course == 2 && (
                    <TicketBody key={dish.id} dish={dish} dishDone={dishDone} _id={_id} />
                ))
            })}
        </>
        }
    
    
    {/* ------------------------ FOOTER ----------------------- */}
        <div className='ticketFooter'>
            <div className='ticketTimeDay'>
                <div className='ticketTime'>
                    <i className="far fa-clock"></i>
                    <p>{time} </p>
                </div>
                <p>{day}</p>
            </div>   
            <div className='frcb'>
                <p>Waiter: {waiter} </p>
                {location.pathname==='/tables' &&
                <div>
                    <button className='button-59'  
                        onClick={()=> editTableId(table,_id)}
                    > update
                    </button>
                    <button className='button-59'
                        onClick={()=>deleteOrd(_id) }
                    > Delete
                    </button>
                </div>
                }
            </div>                     
        </div>

    </div>
    );
}

export default Ticket;
