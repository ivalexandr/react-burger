import { Route, Redirect } from 'react-router-dom'

const ProtectRoute = ({ children, ...props }) => {

  const render = () => {
    return localStorage.getItem('refreshToken') ? children : <Redirect to='/login' />
  }

  return <Route {...props} render={() => render()} />
}

export default ProtectRoute
