import React, { useState } from 'react'
import Item from '../../components/Item/Item'
import Order from '../../components/Order/Order'
import menuJson from '../../data/menu.json'

export default function Menu() {
  const [list, setList] = useState(menuJson)
  const [order, setOrder] = useState([])

 
  const addOneItem = (itemId) => {
    const itemIndex = order.findIndex(el => el.id === itemId)
    let addedItem = list.find(item => item.id===itemId)
        
    //if the item passed to the function is already in the order => update the quantity
    if (itemIndex > -1) {
      let newOrder = [...order]
      newOrder[itemIndex].quantity += 1
      setOrder(newOrder)
      // else : add the item to the order
    } else  {
      addedItem.quantity=1
      setOrder([...order, addedItem])
      }
  }

  const deleteOneItem = (itemId) => {
    let newOrder = [...order]
    const itemIndex = order.findIndex(el => el.id === itemId)

    if (order[itemIndex]) {
      const currentQuantity = order[itemIndex].quantity
      if (currentQuantity>1){
        newOrder[itemIndex].quantity -= 1
        setOrder(newOrder)
      }
      if (currentQuantity === 1){
        newOrder[itemIndex].quantity = 0
        setOrder(newOrder.filter(item => item.id !== itemId))
      }
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
                <Item addOneItem={addOneItem} deleteOneItem={deleteOneItem} {...dish} />
              </div>
            )
          })}
        </div>
      <div className='col'>
        <h2>Order</h2>
        <Order order={order}/>
      </div>
        
      </div>
    </div>
  )
}
