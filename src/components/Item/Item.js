import React, { useState } from 'react'

const Item = ({id,name,description,price,allergens,quantity,type,addOneItem,deleteOneItem})  => {

  const [qty, setQty] = useState(quantity)

  // const handleSubmit = (e) => {
  //   e.preventDefault()

  //   if (qty <= 0) return

  //   const addedDish = { id,name,description,price,allergens,type,quantity: Number(qty) }
  //   addFood(addedDish)
  //   setQty(0)
  // }  
  return (
    <div className='dishMainDiv'>
    
        <p className='itemName'>{name}</p>
        <p className='itemPrice'>{price}€</p>
        <i className="fa-solid fa-plus fa_Plus" onClick={() => addOneItem(id)}></i>
        <p className='itemQty'>{quantity>0 && quantity}</p>

        {quantity>0 && 
        <div>
          <i className="fa-solid fa-minus fa_Minus" onClick={() => deleteOneItem(id)}></i>
          <i className="fas fa-comment"></i>
        </div>
        }


        {/* <div className="">
          <input 
            type="number" 
            min={0}
            value={qty}
            onChange={(event) => setQty(event.target.value)}
            className="inputNumber" 
          />
        </div> */}
          {/* <button 
            onClick={handleSubmit}
            type="submit" 
            className="btn btn-primary"
          > + 
          </button> */}

    </div>
  )
}


export default Item