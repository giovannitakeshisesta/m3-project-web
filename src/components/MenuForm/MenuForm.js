import React from 'react'
import { useState } from 'react' 
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom'
import { addItemMenu, editMenuDetails } from '../../services/menu.service';

const schema = yup.object({
    type: yup.string().typeError("Must be a asdasdasdas").required(''),
    name: yup.string().required('A name is required'),
    description: yup.string().min(2).required('A description is required'),
    price: yup.number().typeError("Must be a number").min(1).required('A price is required')
}).required();

export default function MenuForm({id,prefillValues,toggleShowForm}) {
    const navigate = useNavigate()
    const { register, handleSubmit, formState:{ errors } } = useForm({
        defaultValues:prefillValues,
        resolver: yupResolver(schema)
    });
    const [backErrors, setBackErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const allergens = ["vegetarian", "milk", "egg", "gluten"]
  
    const onSubmit = (data) => {
      setBackErrors({})
      setIsSubmitting(true)
  
      addItemMenu(data)
        .then((response) => {
           navigate(`/menu/${response.id}`)
        })
        .catch(err => {
          setBackErrors(err?.response?.data?.errors)
        })
        .finally(() => {
          setIsSubmitting(false)
        })
    };

    const onSubmitEdit = (data) => {
        editMenuDetails(id,data)
        .then(()=>{
            toggleShowForm()
            navigate(`/menu/${id}`)
        })
        .catch(()=>{})
    };

  return (
    <div className='fccc'>
        <h1 className="mt-3">Menu</h1>

        <form  className="menuForm">

            {/* type */}
            <div className={`d-flex form-group radio-form-group ${backErrors?.type || errors.type?.message ? 'has-error' : ''}`}>
                <div className='me-3 form-check'>
                    <input 
                        className={`me-2 ${backErrors?.type || errors.type?.message ? 'is-invalid' : ''}`}
                        type="radio" 
                        value="food"      
                        {...register("type")} 
                    />
                    <label>Food</label>
                </div>
                <div className='form-check'>
                    <input 
                        className={`me-2 ${backErrors?.type || errors.type?.message ? 'is-invalid' : ''}`}
                        type="radio" 
                        value="drink" 
                        {...register("type")} 
                    />
                    <label>Drink</label>
                    <p className="absolute-error invalid-feedback">{backErrors?.type || errors.type?.message}</p>
                </div>
            </div>

            {/* name */}
            <div className="mb-3">
                <label className="form-label"> Name </label>
                <input
                    className={`form-control ${backErrors?.name || errors.name?.message ? 'is-invalid' : ''}`}
                    type="text"
                    {...register("name")}
                />
                <p className="invalid-feedback">{backErrors?.name || errors.name?.message}</p>
            </div>

            {/* description */}
            <div className='descriptionField'>
                <label> Description </label>
                <textarea  
                    className={`form-control ${backErrors?.description || errors.description?.message ? 'is-invalid' : ''}`}
                    { ...register("description") } 
                />
                <p className="invalid-feedback">{backErrors?.description || errors.description?.message}</p>
            </div>

            {/* price */}
            <div className='priceField'>
                <label className='mt-3'>price</label>
                <input 
                    className={`form-control ${backErrors?.price || errors.price?.message ? 'is-invalid' : ''}`}
                    type="number" 
                    step="any"
                    {...register("price")}
                />
                <p className="invalid-feedback">{backErrors?.price || errors.price?.message}</p>
            </div>

            {/* allergens */}
            <label className='mt-3'>allergens</label>
            <div className='allergensFields'>
                {allergens.map((el,index)=> {
                    return (
                        <div className='me-2' key={index}>
                            <input type="checkbox" id={el} value={el} {...register("allergens")} />
                            <label htmlFor={el} >{el} </label>
                        </div>
                    )
                })}
            </div>

            {prefillValues ? 
                <button 
                    onClick={ handleSubmit(onSubmitEdit) }
                    className={`btn btn-${isSubmitting ? 'secondary' : 'primary'} mt-3`}
                    >
                        {isSubmitting ? 'Editing item...' : 'Edit'}
                </button>
                :
                <button 
                    onClick={handleSubmit(onSubmit)}
                    className={`btn btn-${isSubmitting ? 'secondary' : 'primary'} mt-3`}
                    >
                        {isSubmitting ? 'Creating item...' : 'Submit'}
                </button>
            }
        </form>
    </div>
  )
}


