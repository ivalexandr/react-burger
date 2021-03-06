import React, { useEffect } from 'react'
import AuthForm from '../components/AuthForm/AuthForm'
import Preloader from '../components/Preloader/Preloader'
import { useHistory, useRouteMatch, Redirect } from 'react-router-dom'
import { useAppSelector } from '../redux/hooks'


const ForgotPassword:React.FC = () => {
  const { status, user } = useAppSelector(store => ({
    status: store.AUTH.status,
    user:store.AUTH.user
  }))
  const history = useHistory()
  const {path} = useRouteMatch()
  useEffect(() => {
    history.replace({state:[{path}]})
    // eslint-disable-next-line
  }, [])
  
  const render = () => {
    if (status === 'loading')
      return <Preloader />
    if(user) return <Redirect to = "/" />
    return (
      <AuthForm
        type='forgot'
        headingText='Восстановление пароля'
        buttonText='Восстановить'
        emailText='Укажите e-mail'
      />
    )
  }
  return render()
}
export default ForgotPassword
