import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectRoute = ({ children, ...props }) => {
  const user = useSelector(store => store.AUTH.user)

  const render = () => {
    return user && localStorage.getItem('refreshToken') ? children : <Redirect to='/login' />
  }

  return <Route {...props} render={() => render()} />
}

export default ProtectRoute
