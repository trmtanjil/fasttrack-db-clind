import React, { use } from 'react'
import { AutContext } from '../Contexts/AuthContexts/AutContext'

function useAuth() {
  const authInfo = use(AutContext)
  return authInfo
  
}

export default useAuth