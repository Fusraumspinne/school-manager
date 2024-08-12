"use client"

import React from 'react'
import MagicButton from './ui/Button'
import { signOut } from 'next-auth/react'
import {useSession} from "next-auth/react"

function Dashboard() {
  const {data: session} = useSession()

  return (
    <div>
      <div>
        {session?.user?.name} <br />
        {session?.user?.email}
      </div>
      <div>
        <MagicButton content={"Logout"} funktion={() => signOut()}/>
      </div>
    </div>
  )
}

export default Dashboard