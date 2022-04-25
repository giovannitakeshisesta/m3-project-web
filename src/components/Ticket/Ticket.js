import React from 'react';

const Comandasingola = ({tableInfo,food,drink,createdAt}) => {
    const {people, table, urgent, takeAway, waiter } = tableInfo;
    const time = createdAt.substring(11,16);
    const day = createdAt.substring(0,10);

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
                    <p>{dish.name}</p>
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
     
    </div>
    );
}

export default Comandasingola;
