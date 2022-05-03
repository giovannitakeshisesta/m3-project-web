import React from 'react'

export default function MenuProductCard({image,name,price}) {
  return (
    <div className='menuCardMain'>
        <div className='menuCardInner'>
        
            <div className='menuCardImgDiv'>
                <img className='menuCardImg' src={image} alt="" />
            </div>
       
            <div className='menuCardName' >
                <b>{name}</b>
            </div>
            <div className='menuCardPrice' >
                <p>{price} €</p>
            </div> 
        </div>
    </div>
  )
}
