import React from 'react'
import FarmChain from '../components/farm_chain/farmchain'
import RequireAuth from '../components/RequireAuth'
import CurrentUserProvider from "@/app/components/currentUser";

const Mainpage = () => {
  return (
    <div>
        <RequireAuth>

        <CurrentUserProvider>
          
          <FarmChain />

        </CurrentUserProvider>
        
        </RequireAuth>
      
    </div>
  )
}

export default Mainpage
