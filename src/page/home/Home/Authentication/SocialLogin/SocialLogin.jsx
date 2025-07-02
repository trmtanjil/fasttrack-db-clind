import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import useAuth from '../../../../../hoocks/useAuth'

function SocialLogin() {

    const {signInWithGoogle} =useAuth()

    const handleGoogleSignIn=()=>{
        signInWithGoogle()
        .then(result=>{
            console.log(result.user)
        })
        .catch(error=>{
            console.log(error)
        })
    }

  return (
    <div>
         {/* Divider */}
                <div className="divider text-gray-400">Or</div>
        
                {/* Google Register */}
                <button onClick={handleGoogleSignIn} className="w-full flex text-black items-center justify-center gap-2 bg-gray-100 py-2 rounded-lg hover:bg-gray-200 transition">
                  <FcGoogle className="text-xl text-black" />
                  Register with Google
                </button>
    </div>
  )
}

export default SocialLogin