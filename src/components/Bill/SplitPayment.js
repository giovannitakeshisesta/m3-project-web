import React from 'react'

export default function SplitPayment(
    {table,people,waiter,foodANDdrink,calculateBill,
        editQty,editQtyReverse,currentBill,partialPay}
    ) {
    return (
        <div className='splitRow '>
            <div className='splitLeft'>
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
                    <div className="frcc">
                        <i className="fas fa-users ms-2"></i>
                        <h3>{people}</h3>
                    </div>
                </div>
                {/* --------------------FOOD DRINK ORDERS----------------- */}
                {foodANDdrink.map((el,index) => {
                    return (
                        <div key={index} className="billOrderSplit">
                            <div className="billItems">
                                <p className="billQuantity">{el.quantity} </p>
                                <p className='billName'>{el.name}</p>
                            </div>
                            <div className='frcc'>
                                <p className='me-3'>{el.quantity*el.price} €</p>
                                <button onClick={()=> editQty(index) }> + </button>
                                <p className='billPrice'>{el.price}€</p>
                                <button onClick={()=> editQtyReverse(index) }> - </button>
                            </div>
                        </div>
                    )
                })}
                {/* ------------------------ FOOTER ----------------------- */}
                <div className='billFooter'>
                    <div className='d-flex'>
                        <p>Waiter: {waiter} </p>
                        <p className='ms-5'> Total: {calculateBill(foodANDdrink)} €</p>
                    </div>
                </div>
            </div>

            {/* ------------------------  ----------------------- */}
            {/* ------------------------  ----------------------- */}

            <div className=' splitRight'>
                {currentBill &&
                    currentBill.map((el,index) => {
                        if(el.quantity>0)
                        return (
                            <div key={index} className="d-flex">
                            <p className="">{el.quantity} </p>
                            <p className=''>{el.name}</p>
                            <p className=''>{el.quantity*el.price}€</p>
                            </div>
                        )
                    }) 
                }
                {currentBill.some(el => el.quantity > 0) &&
                     
                        <>
                        <p> Total : {calculateBill(currentBill)}€</p>
                        <button onClick={()=> partialPay()}> pay </button>
                        </>
                    
                }
                
    

            </div>
  
        </div>
    )
}
