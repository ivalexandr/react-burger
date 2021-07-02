import React, { ReactElement } from 'react'
import AuthForm from '../components/AuthForm/AuthForm'
import Preloader from '../components/Preloader/Preloader'
import { Redirect } from 'react-router-dom'
import { useAppSelector } from '../redux/hooks'

const Register:React.FC = () => {
  const { registerStatus, user, status } = useAppSelector(store => ({
    registerStatus: store.AUTH.registerStatus,
    status: store.AUTH.status,
    user:store.AUTH.user
  }))
  const render = ():ReactElement => {
    if (status === 'loading') return <Preloader />
    if (registerStatus === 'success') return <Redirect to = "/" />
    if(user) return <Redirect to = "/"/>
    return (
      <AuthForm
        type='register'
        headingText='Регистрация'
        buttonText='Регистрация'
      />
    )
  }
  return render()
}
export default Register
