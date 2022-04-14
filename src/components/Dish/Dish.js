import React, { useState } from 'react'

const Dish = ({id,name,description,price,allergens,quantity,type,addFood})  => {

  const [qty, setQty] = useState(quantity)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (qty <= 0) return

    const addedDish = { id,name,description,price,allergens,type,quantity: Number(qty) }
    addFood(addedDish)
    setQty(0)
  }  
  return (
    <div className='dishMainDiv'>
        <p>{name}</p>
        <p>{price}€</p>

        <form className='formDish'>
        <div className="">
          <input 
            type="number" 
            min={0}
            value={qty}
            onChange={(event) => setQty(event.target.value)}
            className="inputNumber" 
          />
        </div>
          <button 
            onClick={handleSubmit}
            type="submit" 
            className="btn btn-primary"
          > + 
          </button>
        </form>
      
    
    </div>
  )
}


export default Dish