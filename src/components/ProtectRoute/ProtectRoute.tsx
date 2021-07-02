import React from 'react'
import { Route, Redirect, useLocation, RouteProps } from 'react-router-dom'

const ProtectRoute: React.FC<RouteProps> = ({ children, ...props }) => {
  const location = useLocation()
  return <Route {...props} render={() => localStorage.getItem('refreshToken') ? children : (<Redirect to = {{pathname:'/login', state:location}} />) } />
}

export default ProtectRoute
