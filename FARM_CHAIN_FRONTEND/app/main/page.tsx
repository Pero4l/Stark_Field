import React from 'react'
import FarmChain from '../components/farm_chain/farmchain'
import RequireAuth from '../components/RequireAuth'
import CurrentUserProvider from "@/app/components/currentUser";

const Mainpage = () => {
  return (
    <div>
    

        <CurrentUserProvider>
          
          <FarmChain />

        </CurrentUserProvider>
        
      
      
    </div>
  )
}

export default Mainpage
