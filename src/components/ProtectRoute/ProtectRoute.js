import { Route, Redirect } from 'react-router-dom'

const ProtectRoute = ({ children, ...props }) => {

  return <Route {...props} render={() => localStorage.getItem('refreshToken') ? children : (<Redirect to = {{pathname:'/login'}} />) } />
}

export default ProtectRoute
