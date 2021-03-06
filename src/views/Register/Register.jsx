import { useState } from 'react' 
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup';
import { register as registerRequest } from '../../services/AuthService'
import * as yup from "yup";
import InputGroup from "../../components/InputGroup"
import waiter4 from '../../assets/Waiter4.jpeg'
import '../../styles/Login.scss'


const schema = yup.object({
  email: yup.string().email().required(),
  name: yup.string().required('mensaje desde register view'),
  password: yup.string().min(8, 'mensaje desde register view').required()
}).required();

const Register = () => {
  const [backErrors, setBackErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = data => {
    setBackErrors({})
    setIsSubmitting(true)

    registerRequest(data)
      .then((user) => {
        navigate('/login')
      })
      .catch(err => {
        setBackErrors(err?.response?.data?.errors)
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  };

  return (
    <div className='loginMainDiv' style={{backgroundImage: `url(${waiter4})`}}>
      <div className="loginInputDiv">
        <h1 className="">Register</h1>
        <form
          onSubmit={handleSubmit(onSubmit)} className="formAuth">
          <InputGroup
            label="Email"
            id="email"
            register={register}
            error={backErrors?.email || errors.email?.message}
            type="email"
          />
          <InputGroup
            label="Name"
            id="name"
            register={register}
            error={backErrors?.name || errors.name?.message}
          />
          <InputGroup
            label="Password"
            id="password"
            register={register}
            error={backErrors?.password || errors.password?.message}
            type="password"
          />
          <button className={`btn btn-${isSubmitting ? 'secondary' : 'primary'}`}>{isSubmitting ? 'Creating user...' : 'Submit'}</button>
        </form>
      </div>
    </div>
  )
}

export default Register