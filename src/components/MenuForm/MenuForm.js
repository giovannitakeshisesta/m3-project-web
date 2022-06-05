import React ,{ useState } from 'react' 
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { addItemMenu, editMenuDetails } from '../../services/menu.service';
import InputGroup from "../../components/InputGroup"


const getSchema = (prefillValues) => {
    return yup.object().shape({
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
        image: yup.lazy((value) => {
            if (!prefillValues?.image || prefillValues?.image !== value) {
                return yup.mixed()
                .test('required', 'Required', (value) =>{
                    return value && value.length
                } )
                .test("fileSize", "The file is too large", (value, context) => {
                    return value && value[0] && value[0].size <= 5000000;
                })
                .test("type", "We only support jpeg & png", function (value) {
                    return( value && value[0] && value[0]?.type === "image/jpeg")||(value[0]?.type === "image/png");
                })
            } else {
                return  yup.mixed();
            }
        })
    }).required()
};


export default function MenuForm({id,prefillValues,toggleShowForm}) {
    const navigate = useNavigate()
    const resolver = getSchema(prefillValues);
    const { register, handleSubmit, formState:{ errors } } = useForm({
        defaultValues:prefillValues,
        resolver: yupResolver(resolver)
    });
    const [backErrors, setBackErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const allergens = ["Vegetarian", "Vegan", "Gluten","Crustaceans","Eggs","Fish","Peanuts","Soybeans","Milk","Nuts","Celery","Mustard","Sesame seeds","Sulphites","Lupin","None"]
    const line = ["Starters", "Main Courses", "Desserts"]
  
    // create item
    const onSubmit = (data) => {
        setBackErrors({})
        setIsSubmitting(true)
  
        const bodyFormData = new FormData()
        const { image, allergens, ...rest } = data

        allergens.forEach(allergen => {
            console.log(bodyFormData);
            bodyFormData.append('allergens[]', allergen)
        })

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
        const { image, allergens, ...rest } = data

        allergens.forEach(allergen => {
            bodyFormData.append('allergens[]', allergen)
        })

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

    console.log({allergens})

  return (
    <div className='fccc'>
        <i className="fas fa-arrow-left topRight2" onClick={()=>toggleShowForm()}> Menu  </i>

        <form  className="menuForm">
            <div className='fccc'>
                <h2 className="">{prefillValues ?  "Edit" :"Add a new product!"}</h2>
            </div>
        
            {/* type */}
            <div className='frcc'>
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
            </div>

            <div className='frcb'>
                {/* name */}
                <div className='inputName'>
                    <InputGroup
                        label="Name"
                        id="name"
                        register={register}
                        error={backErrors?.name || errors.name?.message}
                    />
                </div>
                {/* price */}
                <div className="inputPrice">
                    <InputGroup
                        label="Price"
                        id="price"
                        type="number"
                        register={register}
                        error={backErrors?.price || errors.price?.message}
                    />
                </div>
            </div>

            {/* description */}
            <div className='mb-2'>
                <label> Description </label>
                <textarea  
                    className={`form-control ${backErrors?.description || errors.description?.message ? 'is-invalid' : ''}`}
                    { ...register("description") } 
                    rows="3" cols="50"
                />
                <p className="invalid-feedback">{backErrors?.description || errors.description?.message}</p>
            </div>

            {/* image */}
            <InputGroup
                label="Image"
                id="image"
                type="file"
                register={register}
                error={backErrors?.image || errors.image?.message}
            />
            

            {/* allergens */}
            <label>Filters</label>
            <div className='allergensFields'>
                {allergens.map((el,index)=> {
                    return (
                        <div key={index} className="allergensBoxLabel">
                            <input type="checkbox" id={el} value={el} {...register("allergens")} />
                            <p className='ms-2' htmlFor={el} >{el} </p>
                        </div>
                    )
                })}
            </div>

            {/* Line */}
            <label className='mt-2'>Line</label>
            <div className='frcb'>
                {line.map((el,index)=> {
                    return (
                        <div key={index} className="allergensBoxLabel">
                            <input type="checkbox" id={el} value={el} {...register("line")} />
                            <p className='ms-2' htmlFor={el} >{el} </p>
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


