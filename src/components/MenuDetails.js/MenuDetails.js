import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteMenuItem, getMenuDetails } from '../../services/menu.service';
import MenuForm from '../MenuForm/MenuForm';
import fotoSala2 from '../../assets/risto_room2.png'


export default function MenuDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
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

    const deleteItem = (id) => {
        deleteMenuItem(id)
        .then(()=> {
            navigate('/menu')
        })
        .catch((err)=> console.log(err))
    }

    return (
    <div className='menuDetailsMainDiv'  style={{backgroundImage:`url(${fotoSala2})`}}>
        {details && 
            <div className='menuDetailsInnerDiv'>
                {showForm ?
                    <MenuForm prefillValues={details} id={id} toggleShowForm={toggleShowForm}/>
                    :
                    <div >
                        <div className='topRight'>                            
                            <Link to={'/menu'}><i className="fas fa-arrow-left"> Menu </i></Link> 
                        </div>
                        <div>
                            <h1>{details.name}</h1>
                            <div className='menuDetailsRow'>
                                <div className='menuDetailsInfoDiv'>
                                    <p className='mb-1'><b>Price: </b>{details.price} €</p>

                                    <p><b>Line: </b>{details.line}</p>

                                    <p className='mb-1'><b>Filter: </b>
                                        {details.allergens === 'false' ? "None" : details.allergens}
                                    </p>
                            
                                    <div>
                                        <p><b>Description:</b></p>
                                        <p>{details.description}</p>
                                    </div>

                                    <div className='menuDetailsEditBtns'>
                                        <button
                                            className='button-59' 
                                            onClick={()=>toggleShowForm()}
                                            > edit
                                        </button>
                                        <button
                                            className='button-59' 
                                            onClick={()=>{deleteItem(id)}}
                                            > delete
                                        </button>
                                    </div>
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
                    </div>
                }
            </div>              
        }
    </div>
  )
}
