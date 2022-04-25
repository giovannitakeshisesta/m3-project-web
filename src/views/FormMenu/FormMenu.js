import React from 'react'
import { useState } from 'react' 
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom'
import InputGroup from "../../components/InputGroup"
import { addItemMenu } from '../../services/menu.service';

const schema = yup.object({
    name: yup.string().required('A name is required'),
    description: yup.string().required('A description is required'),
    price: yup.number().typeError("Must be a number").min(1).required('A price is required'),
    type: yup.string().required('A sdfsdfsdf is required'),

}).required();

export default function FormMenu() {
    const navigate = useNavigate()
    const { register, handleSubmit, formState:{ errors } } = useForm({
      resolver: yupResolver(schema)
    });
    const [backErrors, setBackErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
  
    const onSubmit = data => {
      setBackErrors({})
      setIsSubmitting(true)
  
      addItemMenu(data)
        .then(() => {
          navigate('/menuForm')
        })
        .catch(err => {
          setBackErrors(err?.response?.data?.errors)
        })
        .finally(() => {
          setIsSubmitting(false)
        })
    };



  return (
    <div className='fccc'>
        <h1 className="mt-3">Menu</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="menuForm">

            {/* type: radio */}
            <div className='d-flex'>
                <div className='me-3'>
                    <input className='me-2'
                        {...register("type", { required: true })} 
                        type="radio" value="food"      
                    />
                    <label>Food</label>
                </div>
                <div>
                    <input className='me-2'
                        {...register("type", { required: true })} 
                        type="radio" value="drink" 
                    />
                    <label>Drink</label>
                </div>
                <p className="invalid-feedback">{backErrors?.type || errors.type?.message}</p>
                {/* <p>{errors.type?.type === 'required' && 'A type is required'}</p> */}
            </div>

            {/* name */}
            {/* <InputGroup
                label="Name"
                id="name"
                register={register}
                error={backErrors?.name || errors.name?.message}
                type="text"
            /> */}

            <div className="mb-3">
                <label className="form-label">
                    Name
                </label>
                <input
                    type="text"
                    className={`form-control ${backErrors?.name || errors.name?.message ? 'is-invalid' : ''}`}
                    {...register("name")}
                />
                <p className="invalid-feedback">{backErrors?.name || errors.name?.message}</p>
            </div>

            {/* description */}
            <div className='descriptionField'>
                <label>Description</label>
                <textarea  className={`form-control ${backErrors?.description || errors.description?.message ? 'is-invalid' : ''}`}
                { 
                    ...register("description", {required: true, max: 200, min: 0, maxLength: -2})
                } />
                <p className="invalid-feedback">{backErrors?.description || errors.description?.message}</p>
            </div>

            {/* price */}
            <div className='priceField'>
                <label className='mt-3'>price</label>
                <input className={`form-control ${backErrors?.price || errors.price?.message ? 'is-invalid' : ''}`}
                    type="number" 
                    {...register("price", {required: true, max: 30, min: 0})}
                />
                <p className="invalid-feedback">{backErrors?.price || errors.price?.message}</p>
            </div>


            <label className='mt-3'>allergens</label>
            <div className='allergensFields'>
                <div className='me-2'>
                    <input type="checkbox" id="vegetarian" {...register("vegetarian", {})} />
                    <label htmlFor="vegetarian">vegetarian</label>
                </div>
                <div className='me-2'>
                    <input type="checkbox" id="eggs" {...register("eggs", {})} />
                    <label htmlFor="eggs">eggs</label>
                </div>
                <div className='me-2'>
                    <input type="checkbox" id="milk" {...register("milk", {})} />
                    <label htmlFor="milk">milk</label>
                </div>
                <div className='me-2'>
                    <input type="checkbox" id="gluten" {...register("gluten", {})} />
                    <label htmlFor="gluten">gluten</label>
                </div>
            </div>

            <button 
                className={`btn btn-${isSubmitting ? 'secondary' : 'primary'} mt-3`}>
                {isSubmitting ? 'Creating item...' : 'Submit'}
            </button>
        </form>
    </div>
  )
}
