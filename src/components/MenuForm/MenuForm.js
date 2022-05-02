import React ,{ useState } from 'react' 
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { addItemMenu, editMenuDetails } from '../../services/menu.service';
import InputGroup from "../../components/InputGroup"


const schema = yup.object().shape({
    type: yup.string()
        .typeError('Required')
        .required(''),
    name: yup.string()
        .required('Required'),
    description: yup.string()
        .required('Required')
        .min(2),
        price: yup.number()
        .required()
        .typeError('Required')
        .min(1),
    image: yup.mixed()
        .test('required', 'Required', (value) =>{
            return value && value.length
        } )
        // .test("fileSize", "The file is too large", (value, context) => {
        //     return value && value[0] && value[0].size <= 200000;
        // })
        // .test("type", "We only support jpeg & png", function (value) {
        //     return value && value[0] && value[0].type === "image/jpeg"||value[0].type === "image/png";
        // })
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
  
    // create item
    const onSubmit = (data) => {
        setBackErrors({})
        setIsSubmitting(true)
  
        const bodyFormData = new FormData()
        const { image, ...rest } = data
        Object.keys(rest).forEach(key => {
            bodyFormData.append(key, rest[key])
            })
        if (image[0]) {
            bodyFormData.append('image', image[0])
        }
        
        addItemMenu(bodyFormData)
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

    // edit item
    const onSubmitEdit = (data) => {

        const bodyFormData = new FormData()
        const { image, ...rest } = data
        Object.keys(rest).forEach(key => {
            bodyFormData.append(key, rest[key])
            })
        if (!image[0].length) {
            bodyFormData.append('image', image[0])
        }

        editMenuDetails(id,bodyFormData)
        .then(()=>{
            toggleShowForm()
            navigate(`/menu/${id}`)
        })
        .catch(()=>{})
    };


  return (
    <div className='fccc'>
        <h1 className="mt-3">Add a new item!</h1>

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
            <InputGroup
                label="Name"
                id="name"
                register={register}
                error={backErrors?.name || errors.name?.message}
            />

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
            <InputGroup
                label="Price"
                id="price"
                type="number"
                register={register}
                error={backErrors?.price || errors.price?.message}
            />

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

            {/* image */}
            <InputGroup
                // name="image"
                label="Image"
                id="image"
                type="file"
                register={register}
                error={backErrors?.image || errors.image?.message}
            />

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


