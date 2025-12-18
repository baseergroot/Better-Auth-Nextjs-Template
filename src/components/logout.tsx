"use client"
import Logout from '@/action/logout'
import { Button } from './ui/button'
import { useTransition } from 'react'

const LogoutBtn = () => {
  const [isPending, startTransition] = useTransition()

  const handleLogout = () => {
    startTransition(() => {
      Logout()
    })
  }

  return (
    <Button disabled={isPending}
      className={` ${ isPending && "cursor-not-allowed" }` } 
    onClick={handleLogout}
    >Logout</Button>
  )
}

export default LogoutBtn