import React from 'react'

export default function BillTicket({
    tableInfo,foodANDdrink,
    calculateBill,
    partialPayBtn,
    showTotalXperson,
    editQty,editQtyReverse,
    ticketId    
}) 
{
    const {table,people,waiter}={...tableInfo}

    return (
        <div className='billTotal'>
            {/* ------------------------TABLE INFO------------------------ */}
            <div className="billHeader">
                <div className="frcc">
                    <img
                    src="images/table_icon_125938.png"
                    alt="table"
                    className="imgTable"
                    />
                    <h3>{table}</h3>
                </div>

                {!showTotalXperson && <p>Partial Payment</p>}

                <div className="frcc">
                    <i className="fas fa-users ms-2"></i>
                    <h3>{people}</h3>
                </div>
            </div>

            {/* --------------------FOOD DRINK ORDERS----------------- */}
            {editQty ?
            foodANDdrink.map((el,index) => {
                return (
                    <div key={index} className="billBody">
                        <div className="billItems">
                            <p className="billQuantity">{el.quantity} </p>
                            <p className='billName'>{el.name}</p>
                        </div>

                        <div className='arrowBtnsBill'>
                            <p className='billPricexqt me-3'>{el.quantity*el.price} €</p>   
                            
                            <i className="far fa-arrow-alt-circle-right"
                                onClick={()=> editQty(ticketId,el.type,el.name)}
                            />
                        
                            <p className='billPrice'>{el.price}€</p>

                            <i className="far fa-arrow-alt-circle-left" 
                                onClick={()=> editQtyReverse(ticketId,el.type,el.name)}
                            />
                        </div>
                    </div>
                ) 
            })
            :
            foodANDdrink.map((el,index) => {
                if (el.quantity > 0) {
                    return (
                        <div key={index} className="billBody">
                            <div className="billItems">
                                <p className="billQuantity">{el.quantity} </p>
                                <p className='billName'>{el.name}</p>
                            </div>
                            <p className='billPricexqt'>{el.quantity*el.price} €</p>   
                        </div>
                    )
                }
            })
            }  

     
            {/* ------------------------ FOOTER ----------------------- */}
            <div className='billFooter'>
                <div className='waiterTotal'>
                    <p>Waiter: {waiter} </p>
                    <p> {editQty ? "Current total": "Total:" } {calculateBill(foodANDdrink)} €</p>
                </div> 

                {partialPayBtn &&  foodANDdrink.some(el => el.quantity > 0) &&                  
                <button onClick={()=> partialPayBtn()}> pay </button>
                }

                {showTotalXperson &&
                <p className='xperson'> 
                    Total x person: {(calculateBill(foodANDdrink)/people).toFixed(2)}€
                </p> 
                }
            </div>

        </div>
    )
}
