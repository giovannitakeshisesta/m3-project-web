import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getMenu } from '../../services/menu.service';
import MenuProductCard from '../MenuProductCard/MenuProductCard';

export default function MenuList({toggleShowForm}) {
    const [foodList, setFoodList]= useState([])
    const [drinkList, setDrinkList]= useState([])


    useEffect(() => {
        getMenu()
        .then((response) => {
            setFoodList(response.filter(el =>el.type === "food"))
            setDrinkList(response.filter(el =>el.type === "drink"))
        })
        .catch((err) => console.log(err))
    }, []);

// console.log(foodList);
  return (
     
    <div className='menuListMain'>
        <div className='menuListTop'>
            <i class="fas fa-utensils"></i>
            <h1>MENU</h1>
            <i class="fas fa-glass-cheers"></i>
            <i class="fas fa-plus-circle topRight3" onClick={()=>toggleShowForm()}></i>
        </div>
        <div className='menuListRow'>
            <div className='menuListCol '>
                {foodList.map(item => {
                    return (
                        <div key={item.id} >
                            <Link to={`/menu/${item.id}`} className="menuCardComponent">
                                <MenuProductCard {...item}/>
                            </Link>
                        </div>
                    )
                })}
            </div>
            <div className='menuListCol '>
                {drinkList.map(item => {
                    return (
                        <div key={item.id} >
                            <Link to={`/menu/${item.id}`} className="menuCardComponent">
                                <MenuProductCard {...item}/>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}
