import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { deleteMenuItem, getMenu } from '../../services/menu.service';

export default function MenuList() {
    const navigate = useNavigate()
    const [menuList, setMenuList]= useState([])
    const[refresh, setRefresh]=useState(false)
    useEffect(() => {
        getMenu()
        .then((response) => setMenuList(response))
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
    <div>
    <h1>MenuList</h1>
    {menuList && 
        menuList.map(item => {
            return ( 
                <div key={item.id} className="d-flex">
                    <p> <Link to={`/menu/${item.id}`}>{item.name}</Link></p>
                    <button onClick={()=>{
                        deleteItem(item.id)
                    }}> delete</button>
                </div>
            )
        })
    }
    </div>
  )
}
