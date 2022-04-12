import React from 'react'
import Dish from '../../components/Dish/Dish'
import menuList from '../../data/menu.json'

export default function Menu() {
  return (
    <div>
      <div className='fccc'>
        <h1>Menu Page</h1>
      </div>

      <div className='row'>
        <div className='col'> 
        <h2>Menu</h2>
        {menuList.map(dish => {
            return (
              <div key={dish.id}>
                <Dish {...dish}/>
              </div>
            )
          })}
        </div>
      <div className='col'>
        <h2>Order</h2>
      </div>
        
      </div>
    </div>
  )
}
