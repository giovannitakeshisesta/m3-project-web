import React from 'react'
import '../../styles/Item.scss'

const Item = ({id,name,description,price,allergens,quantity,type,message,addOneItem,deleteOneItem,openModal, order,changeCourse,openModalDescription})  => {
  return (
    <div className='dishMainDiv'>
        <p className='itemName' onClick={()=> openModalDescription(name,description,price)}>{name}</p>
        <p className='itemPrice'>{price}€</p>
        <i className="fa-solid fa-plus" onClick={() => addOneItem(id,type)}></i>

        {order[0]?.quantity > 0 && 
        <>
          <p className='itemQty'>{order[0].quantity}</p>
          <div>
            <i className="fa-solid fa-minus" onClick={() => deleteOneItem(id,type)}></i>
            <i className="fas fa-comment"    onClick={() => openModal(order[0].message,id,type)}></i>
            <i className="fas fa-ellipsis-h" onClick={() => changeCourse(type,id,order[0].course)}></i>
          </div>
        </>
        }
    </div>
  )
}


export default Item
