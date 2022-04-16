import React, { useState } from 'react'
import './Item.css'

const Item = ({id,name,description,price,allergens,quantity,type,message,addOneItem,deleteOneItem,openModal})  => {

  const [qty, setQty] = useState(quantity)


  return (
    <div className='dishMainDiv'>
    
        <p className='itemName'>{name}</p>
        <p className='itemPrice'>{price}€</p>
        <i className="fa-solid fa-plus" onClick={() => addOneItem(id)}></i>
        <p className='itemQty'>{quantity > 0 && quantity}</p>

        {quantity > 0 && 
        <div>
          <i className="fa-solid fa-minus" onClick={() => deleteOneItem(id)}></i>
          <i className="fas fa-comment" onClick={() => openModal(message,id)}></i>
        </div>
        }
    </div>
  )
}


export default Item