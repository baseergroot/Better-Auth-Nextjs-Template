

import SignUpForm from "@/components/SignUp"
import { cache } from "react"

const page = cache(() => {
  return (
    <SignUpForm />
  )
})

export default page