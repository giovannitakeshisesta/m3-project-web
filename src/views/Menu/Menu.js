import React, { useState } from 'react'
import Dish from '../../components/Dish/Dish'
import Order from '../../components/Order/Order'
import menuJson from '../../data/menu.json'

export default function Menu() {
  const [list, setList] = useState(menuJson)
  const [order, setOrder] = useState([])

  const addFood = (addedItem) => {
    const itemIndex = order.findIndex(el => el.id === addedItem.id)
    //if the item passed to the function is already in the order => update the quantity
    if (itemIndex > -1) {
      let newOrder = [...order]
      newOrder[itemIndex].quantity = newOrder[itemIndex].quantity + addedItem.quantity
      setOrder(newOrder)
      // else : add the item to the order
    } else  {
      setOrder([...order, addedItem])
    }
  }

  
  const deleteOne = (itemId) => {
    let newOrder = [...order]
    const itemIndex = order.findIndex(el => el.id === itemId)
    const currentQuantity = order[itemIndex].quantity
    if (currentQuantity>1){
      newOrder[itemIndex].quantity = newOrder[itemIndex].quantity -1
      setOrder(newOrder)
    }
    if (currentQuantity<=1){
      setOrder(newOrder.filter(item => item.id !== itemId))
    }
  }


  return (
    <div>
      <div className='fccc'>
        <h1>Menu Page</h1>
      </div>

      <div className='row'>
        <div className='col'> 
        <h2>Menu</h2>
        {list.map(dish => {
            return (
              <div key={dish.id}>
                <Dish addFood={addFood} {...dish} />
              </div>
            )
          })}
        </div>
      <div className='col'>
        <h2>Order</h2>
        <Order order={order} deleteOne={deleteOne}/>
      </div>
        
      </div>
    </div>
  )
}
