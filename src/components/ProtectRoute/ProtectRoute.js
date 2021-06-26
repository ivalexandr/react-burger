import { Route, Redirect, useLocation } from 'react-router-dom'

const ProtectRoute = ({ children, ...props }) => {
  const location = useLocation()
  return <Route {...props} render={() => localStorage.getItem('refreshToken') ? children : (<Redirect to = {{pathname:'/login', state:location}} />) } />
}

export default ProtectRoute
