import React from "react"
import {Route, Routes} from 'react-router-dom'
import { publicRoutes } from "./allRoutes"
import PublicRoutes from "./PublicRoutes"

export default function RouteIndex() {
  return (
    <React.Fragment >
        <Routes>
            {publicRoutes.map((route, index) =>(
                <Route 
                    key={index}
                    path={route.path}
                    element={
                        <PublicRoutes>
                            <route.component />
                        </PublicRoutes>
                    }
                />
            ))}
        </Routes>
    </React.Fragment>
  )
}
