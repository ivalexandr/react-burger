import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { setStateHistory } from '../../redux/auth/authSlice'
import {useLocation} from 'react-router-dom'


const ProtectRoute = ({ children, ...props }) => {
  const dispatch = useDispatch()
  const location = useLocation()
  useEffect(() => {
    dispatch(setStateHistory(location))
    // eslint-disable-next-line
  }, [])

  return <Route {...props} render={() => localStorage.getItem('refreshToken') ? children : (<Redirect to = {{pathname:'/login'}} />) } />
}

export default ProtectRoute
