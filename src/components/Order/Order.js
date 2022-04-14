import React from 'react'

export default function Order({order}) {

    const calculateBill = () => {
        return order.reduce((acc, item) => {
          acc += (item.price * item.quantity)
          return acc
        }, 0)
      }
  return (

    <div>
    {order.map( item => {
        return(
            <div key={item.id} >
                {item.type === "food" &&
                <div className="d-flex">
                    <p>{item.name}</p>
                    <p>{item.quantity}</p>
                </div>
                }
            </div>
        )
    })}
    <hr/>
    {order.map( item => {
        return(
            <div key={item.id} >
                {item.type === "drink" &&
                <div className="d-flex">
                    <p>{item.name}</p>
                    <p>{item.quantity}</p>
                    
                </div>
                }
            </div>
        )
    })}

    <div>
        <p>Total : {calculateBill()}€</p>
    </div>
    </div>
  )
}
