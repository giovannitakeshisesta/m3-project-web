import React from 'react'

export default function Dish({name,price}) {
  return (
    <div className='dishMainDiv'>
        <p>{name}</p>
        <p>{price}€</p>
    </div>
  )
}
