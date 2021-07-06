import React, { ReactElement } from 'react'
import { useAppSelector } from '../redux/hooks'
import Preloader from '../components/Preloader/Preloader'
import { useLocation, Redirect } from 'react-router-dom'
import AuthForm from '../components/AuthForm/AuthForm'

const ResetPassword = () => {
  const { status } = useAppSelector(store => ({
    status: store.AUTH.status
  }))
  const { state } = useLocation()
  const render = (): ReactElement => {
    if (status === 'loading') {
      return <Preloader />
    }
    if (!state) {
      return <Redirect to='/forgot-password' />
    }
    return (
      <AuthForm
        type='reset'
        headingText='Восстановление пароля'
        buttonText='Сохранить'
        passText='Введите новый пароль'
      />
    )
  }
  return render()
}
export default ResetPassword
