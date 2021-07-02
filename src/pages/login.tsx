import React from 'react'
import { useAppSelector } from '../redux/hooks'
import AuthForm from '../components/AuthForm/AuthForm'
import { Redirect, useLocation } from 'react-router-dom'
import Preloader from '../components/Preloader/Preloader'

const Login:React.FC = () => {
  const { user, status } = useAppSelector(store => ({
    status: store.AUTH.status,
    user:store.AUTH.user
  }))
  const location = useLocation<Location>()
  
  const render = () => {
    if (status === 'loading') return <Preloader />
    if (user) return <Redirect to = {{pathname:location?.state?.pathname} || '/'} />
    return <AuthForm type='login' headingText='Вход' buttonText='Войти' />
  }
  return render()
}
export default Login
