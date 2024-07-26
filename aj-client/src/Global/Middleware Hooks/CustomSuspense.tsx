import { FC, ReactNode, Suspense } from 'react'
import AppLoader from '../Loaders/AppLoader'

const CustomSuspense:FC<{children:ReactNode}> = ({children}) => {
  return (
    <Suspense fallback={<AppLoader/>}>
{children}
    </Suspense>
  )
}

export default CustomSuspense