import React, { useState } from 'react'
import './Item.css'

const Item = ({id,name,description,price,allergens,quantity,type,message,addOneItem,deleteOneItem,openModal, order})  => {

  return (
    <div className='dishMainDiv'>
    
        <p className='itemName'>{name}</p>
        <p className='itemPrice'>{price}€</p>
        <i className="fa-solid fa-plus" onClick={() => addOneItem(id,type)}></i>

        {order[0]?.quantity > 0 && 
        <>
          <p className='itemQty'>{order[0].quantity}</p>
          <div>
            <i className="fa-solid fa-minus" onClick={() => deleteOneItem(id,type)}></i>
            <i className="fas fa-comment" onClick={() => openModal(id)}></i>
          </div>
        </>
        }
    </div>
  )
}


export default Item