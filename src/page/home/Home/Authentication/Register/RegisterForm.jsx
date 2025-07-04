import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router';
import useAuth from '../../../../../hoocks/useAuth';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';
import useAxios from '../../../../../hoocks/useAxios';
 
const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [profilepic, setprofilepic]=useState()

  const {cratUser,userProfileUpdate} = useAuth()
  const axiosInstance =useAxios()


  const onSubmit = (data) => {
    console.log('Form Data:', data);
    cratUser(data.email, data.password)
    .then(async(result)=>{
      console.log(result.user)

      //update userinfo in the database

      const userInfo = {
        email: data.email,
        role: 'user',
        created_at : new Date().toISOString(),
        last_log_in:new Date().toISOString()
      }

      const userRes = await axiosInstance.post('/users', userInfo);
      console.log(userRes.data)


      //update user profile in firebase 
      const userProfile = {
        displayName : data.name,
        photoURL : profilepic
      }
      userProfileUpdate(userProfile)
      .then(()=>{
        console.log('profile name pic updated ')
      })
      .catch(error =>{
        console.log(error)
      })

    })
    .catch(error=>{
      console.log(error)
    })
  };


  const handleimageuploaded =async(e)=>{
   const image =  e.target.files[0]
   console.log(image)
   const formData = new FormData();
   formData.append('image', image)

   const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLOAD_KEY}`

   const res = await axios.post(imageUploadUrl, formData)

   setprofilepic(res.data.data.url)
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 px-4 p-5 rounded-2xl">
      <div className="bg-base-100 p-8 rounded-xl shadow-lg w-full max-w-md text-center space-y-5">
        <h2 className="text-3xl font-bold text-primary">Create an Account</h2>
        <p className="text-gray-500">Register with Profast</p>

        {/* Profile icon */}
        <div className="flex justify-center">
          
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
          {/* Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Upload Photo</label>
            <input
              onChange={handleimageuploaded}
              type="file"
              className="file-input file-input-bordered w-full"
            />
          
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-full bg-lime-300 hover:bg-lime-400 text-black font-semibold"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-green-600 font-medium   btn-link">
            Login
          </Link>
        </p>

        {/* Divider */}
         <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default RegisterForm;
