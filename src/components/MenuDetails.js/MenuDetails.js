import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { getMenuDetails } from '../../services/menu.service';
import MenuForm from '../MenuForm/MenuForm';

export default function MenuDetails() {
    const { id } = useParams()
    const [details,setDetails]= useState()
    const [showForm,setShowForm]=useState(false)

    useEffect(() => {
        getMenuDetails(id)
        .then((response)=> setDetails(response))
        .catch((err) => console.log(err))
    }, [showForm]);

    const toggleShowForm = () => {
        setShowForm(!showForm)
    }
    
    return (
    <div>MenuDetails
        <Link to={'/menu'}>Menu</Link>
        {details && 

            <div>
                <button
                    onClick={()=>toggleShowForm()}>
                    edit
                </button>
                <div >
                    <p>{details.name}</p>
                    <p>{details.description}</p>
                    <p>{details.price} €</p>
                
                    {details.allergens.map((el, index) => {
                        return (
                            <li key={index}>{el}</li>
                        )
                    })}
                    
                    {details.image ? (
                        <img src={details.image} alt="" />
                    ) : (
                        <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" alt="" />
                    )}
                </div>
                {showForm &&
                <MenuForm prefillValues={details} id={id} toggleShowForm={toggleShowForm}/>
                }
            </div>              
        }
    </div>
  )
}
