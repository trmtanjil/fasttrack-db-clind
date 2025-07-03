import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router'
import SocialLogin from '../SocialLogin/SocialLogin'
import useAuth from '../../../../../hoocks/useAuth'

function Login() {
    const {register, handleSubmit,  formState: { errors }}=useForm()

    const {singIn} = useAuth();
    const location =useLocation()
    const from = location.state?.from || '/';
    const navigate = useNavigate()


    const onSubmit = data =>{
      singIn(data.email, data.password)
      .then(result=>{
        console.log(result.user)
        navigate(from)
      })
      .catch(error=>{
        console.log(error)
      })
    }

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form 
      onSubmit={handleSubmit(onSubmit)}
      className="card-body">
        <fieldset className="fieldset">


          <label className="label">Email</label>
          <input type="email"
          {...register('email',{
            required:true,
          })}
          className="input" placeholder="Email" />
          {
            errors.email?.type ==='required' &&<p className='text-red-500'>
                emial is required 
            </p>
          }



          <label className="label">Password</label>
          <input type="password" 
           {...register('password',{
            required:true,
            minLength:6
           })}
          className="input" placeholder="Password" />
            {
            errors.password?.type ==='required' &&<p className='text-red-500'>
                password is required 
            </p>
          }
           {
            errors.password?.type ==='minLength' &&<p className='text-red-500'>
                password is minLength 6 cherecter 
            </p>
          }


          <div><a className="link link-hover">Forgot password?</a></div>


          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
         {/* Login Link */}
        <p className="text-sm text-gray-500">
          new this website ?{' '}
          <Link to="/register" className="text-green-600 font-medium   btn-link">
            Register
          </Link>
        </p>

        {/* Divider */}
       <SocialLogin></SocialLogin>
      </form>
    </div>
  )
}

export default Login