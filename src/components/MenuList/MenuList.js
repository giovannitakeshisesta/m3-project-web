import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getMenu } from '../../services/menu.service';
import MenuProductCard from '../MenuProductCard/MenuProductCard';

export default function MenuList({toggleShowForm}) {
    const [foodList, setFoodList]= useState([])
    const [drinkList, setDrinkList]= useState([])
    const line = ["Starters", "Main Courses", "Desserts"]

    useEffect(() => {
        getMenu()
        .then((response) => {
            setFoodList(response.filter(el =>el.type === "food"))
            setDrinkList(response.filter(el =>el.type === "drink"))
        })
        .catch((err) => console.log(err))
    }, []);

  return (
     
    <div className='menuListMain'>
        <div className='menuListTop'>
            <i className="fas fa-utensils"></i>
            <h1>MENU</h1>
            <i className="fas fa-glass-cheers"></i>
            <i className="fas fa-plus-circle topRight3" onClick={()=>toggleShowForm()}></i>
        </div>
        <div className='menuListRow'>
            <div className='menuListCol '>
                {line.map((el,index) => {
                    return(
                        <div key={index}>
                            <h4 className="line">{el}</h4>
                            {foodList.map(item => {
                                return ( item.line[0]=== el &&
                                    <div key={item.id} >
                                        <Link to={`/menu/${item.id}`} className="menuCardComponent">
                                            <MenuProductCard {...item}/>
                                        </Link>
                                    </div>
                                )
                            })}
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
