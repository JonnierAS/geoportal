import React, {ReactNode} from 'react'
import { Navigate } from 'react-router-dom'

interface ChildrenProps {
    children: ReactNode;
}

export default function PublicRoutes({ children }: ChildrenProps) {

  if(children){
    return <React.Fragment>{children}</React.Fragment>
  }

  return <Navigate to={{ pathname: '/' }} />
}
