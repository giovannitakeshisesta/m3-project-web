import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { deleteMenuItem, getMenu } from '../../services/menu.service';

export default function MenuList() {
    const navigate = useNavigate()
    const [foodList, setFoodList]= useState([])
    const [drinkList, setDrinkList]= useState([])
    const [refresh, setRefresh]=useState(false)


    useEffect(() => {
        getMenu()
        .then((response) => {
            setFoodList(response.filter(el =>el.type === "food"))
            setDrinkList(response.filter(el =>el.type === "drink"))
        })
        .catch((err) => console.log(err))
    }, [refresh]);

    const deleteItem = (id) => {
        deleteMenuItem(id)
        .then(()=> {
            setRefresh(!refresh)
            navigate('/menu')
        })
        .catch((err)=> console.log(err))
    }
  return (
     
        <div className='menuListRow'>
        <div className='menuListCol'>
        <h2>Food</h2>
            {foodList.map(item => {
                return (
                    <div key={item.id} className="menuListItem">
                        <p> <Link to={`/menu/${item.id}`}>{item.name}</Link></p>
                        <i className="fas fa-trash-alt" onClick={()=>{deleteItem(item.id)}}></i>
                    </div>
                )
            })}
        </div>
        <div className='menuListCol'>
            <h2>Drinks</h2>
            {drinkList.map(item => {
                return (
                    <div key={item.id} className="menuListItem">
                        <p> <Link to={`/menu/${item.id}`}>{item.name}</Link></p>
                        <i className="fas fa-trash-alt" onClick={()=>{deleteItem(item.id)}}></i>
                    </div>
                )
            })}
        </div>
        </div>
  )
}
