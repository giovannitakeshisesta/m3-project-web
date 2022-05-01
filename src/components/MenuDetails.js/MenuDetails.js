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
    }, [showForm,id]);

    const toggleShowForm = () => {
        setShowForm(!showForm)
    }

    return (
    <div>
        <div className='frcb'>
            <h2>Item Details</h2>
            
            <i className="fas fa-arrow-left"><Link to={'/menu'}> Menu </Link> </i>
        </div>
        {details && 
            <div>
                {showForm ?
                    <MenuForm prefillValues={details} id={id} toggleShowForm={toggleShowForm}/>
                    :
                    <div className='menuDetailsMainDiv'>
                        <h1>{details.name}</h1>
    
                        <div className='d-flex'>
                            <div className='menuDetailsInfoDiv'>
                                <p><b>Price: </b>{details.price} €</p>
                                <p><b>Filter :</b>
                                    {details.allergens == 'false' ? "None" : details.allergens}
                                </p>
                                
                                <div>
                                    <p><b>Description:</b></p>
                                    <p>{details.description}</p>
                                </div>
                                <button
                                    onClick={()=>toggleShowForm()}>
                                    edit
                                </button>
                            </div>

                            
                            <div className='menuDetailsImgDiv'> 
                                {details.image ? (
                                    <img className='menuDetailsImg' src={details.image} alt="" />
                                ) : (
                                    <img className='menuDetailsImg' src="/images/placeholder-image.jpeg" alt="" />
                                )}
                            </div>
                        </div>
                    </div>
                }
            </div>              
        }
    </div>
  )
}
