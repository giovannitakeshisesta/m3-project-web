import { useState } from 'react' 
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useLocation, useNavigate } from 'react-router-dom'
import InputGroup from "../../components/InputGroup"
import { loginRequest } from '../../services/AuthService';
import { useAuthContext } from '../../contexts/AuthContext';
import '../../styles/Login.scss'


const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required()
}).required();

const Login = () => {
  const navigate = useNavigate()
  let location = useLocation();

  let from = location.state?.from?.pathname || "/";

  const { login } = useAuthContext()

  const [error, setError] = useState()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    setError(undefined)
    setIsSubmitting(true)

    loginRequest(data)  // (data) => http.post('/login', data)
      .then(response => {
       login(response.access_token, () => navigate(from, { replace: true }))
      })
      .catch(err => {
        setError(err?.response?.data?.message)
      })
      .finally(() => setIsSubmitting(false))
  }

  return (
    <div className="loginMainDiv">
      <h1 className="mt-3">Login</h1>

      <form 
        onSubmit={handleSubmit(onSubmit)} className="formAuth">
        <InputGroup
          label="Email"
          id="email"
          register={register}
          error={errors.email?.message}
          type="email"
        />
        <InputGroup
          label="Password"
          id="password"
          register={register}
          error={error || errors.password?.message}
          type="password"
        />

        <button className={`btn btn-${isSubmitting ? 'secondary' : 'primary'}`}>{isSubmitting ? 'Loggin in...' : 'Submit'}</button>
      </form>
    </div>
  )
}

export default Login