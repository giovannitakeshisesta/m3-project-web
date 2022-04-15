import React, { useState } from 'react'
import Formallergens from '../../components/FormAllergens/FormAllergens'
import Item from '../../components/Item/Item'
import Order from '../../components/Order/Order'
import menuJson from '../../data/menu.json'

export default function Menu() {
  const [list, setList] = useState(menuJson)
  const [order, setOrder] = useState([])
  const [filterToggle, setFilterToggle]= useState(false)
  const [filterBy, setFilterBy]= useState([])

 
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


  const handleCheckBox = () => {
    const values = Array
    .from(document.querySelectorAll('input[type="checkbox"]'))
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);
    setFilterBy(values)
  }

  return (
    <div>
      <div className='fccc'>
        <h1>Menu Page</h1>
      </div>

      <div className='row'>
        <div className='col'> 
        <h2>Menu</h2>

        {/* FILTER */}
        <button onClick={()=> setFilterToggle(!filterToggle)}>filter</button>
        {filterToggle && 
        <Formallergens handleCheckBox={handleCheckBox} filterBy={filterBy}/>
        }

        {/* LIST OF DISHES */}
        {list.map(dish => {
           if (filterBy.every(i => !dish.allergens.includes(i))) {
            return (
              <div key={dish.id}>
                <Item addOneItem={addOneItem} deleteOneItem={deleteOneItem} {...dish} />
              </div>
            )
           }
          })}
        </div>

        {/* ORDER TICKET */}
      <div className='col'>
        <h2>Order</h2>
        <Order order={order}/>
      </div>
        
      </div>
    </div>
  )
}
