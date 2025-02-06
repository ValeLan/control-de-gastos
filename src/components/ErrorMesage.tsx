import { ReactNode } from "react"

type ErrorMesageProps = {
    children: ReactNode
}

const ErrorMesage = ({children} : ErrorMesageProps) => {
  return (
    <p className="bg-red-600 p-2 text-white font-bold text-sm text-center">{children}</p>
  )
}

export default ErrorMesage