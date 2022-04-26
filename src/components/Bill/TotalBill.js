import React from 'react'

export default function TotalBill({table,people,waiter,foodANDdrink,calculateBill,splitView}) {

    console.log(splitView);
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

            <div className="frcc">
                <i className="fas fa-users ms-2"></i>
                <h3>{people}</h3>
            </div>
        </div>

    {/* --------------------FOOD DRINK ORDERS----------------- */}
    {foodANDdrink.map((el,index) => {
        if ( el.quantity > 0)
        return (
            <div key={index} className="billOrder">
                <div className="billItems">
                    <p className="billQuantity">{el.quantity} </p>
                    <p className='billName'>{el.name}</p>
                </div>
                <p className='billPricexqt'>{el.quantity*el.price} €</p>
            </div>
        )
    })}
        


    {/* ------------------------ FOOTER ----------------------- */}
        <div className='billFooter'>
            <div className='waiterTotal'>
                <p>Waiter: {waiter} </p>
                <p> Total: {calculateBill(foodANDdrink)} €</p>
            </div>                     
            {!splitView &&
            <p className='xperson'> Total x person: {(calculateBill(foodANDdrink)/people).toFixed(2)}€</p> }
        </div>

    </div>
  )
}
