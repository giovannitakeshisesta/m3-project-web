import React from 'react'
import { useAuthContext } from '../../contexts/AuthContext'
import TicketHeader from '../TicketHeader/TicketHeader'

export default function BillTicket({
    tableInfo,foodANDdrink,
    calculateBill,
    partialPayBtn,
    showTotalXperson,
    editQty,editQtyReverse,
    ticketId,
    header
}) 
{
    const {people,waiter}={...tableInfo}
    const { user } = useAuthContext()


    return (
        <div className='billTotal'>
            {/* ------------------------ HEADER------------------------ */}
            {header &&
            <TicketHeader {...tableInfo} showTotalXperson={showTotalXperson}/>
            }

            {/* ------------------------ BODY  ------------------------ */}
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
                    {<p> Waiter:{editQty || showTotalXperson ?  waiter : user.name } </p>}
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
