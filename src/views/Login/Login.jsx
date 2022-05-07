import { useState } from 'react' 
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import InputGroup from "../../components/InputGroup"
import { loginRequest } from '../../services/AuthService';
import { useAuthContext } from '../../contexts/AuthContext';
import waiter from '../../assets/waiter1.jpeg'
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
    <div className='xxx'>
      <div className="loginMainDiv" style={{backgroundImage: `url(${waiter})`}}>
        <div className="loginInputDiv">
          <h1 className="">Login</h1>
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
            <button className={`mb-3 btn btn-${isSubmitting ? 'secondary' : 'primary'}`}>{isSubmitting ? 'Loggin in...' : 'Submit'}</button>
          </form>
          <p>Dont have an account? </p>
          <Link to="/register" className='SignupNow'> Signup Now </Link>
      
        </div>
      </div>
    </div>
  )
}

export default Login