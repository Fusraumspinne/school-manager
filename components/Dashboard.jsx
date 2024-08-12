"use client"

import React from 'react'
import {useSession} from "next-auth/react"
import Navigationbar from './ui/Navbar'

function Dashboard() {
  const {data: session} = useSession()

  return (
    <div>
      <Navigationbar/>

      <div className='main_div'>
        {session?.user?.name} <br />
        {session?.user?.email}
      </div>
    </div>
  )
}

export default Dashboard