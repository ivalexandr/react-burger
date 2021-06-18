import { useEffect } from 'react'
import AuthForm from '../components/AuthForm/AuthForm'
import Preloader from '../components/Preloader/Preloader'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'


const ForgotPassword = () => {
  const { resetPasswordStatus } = useSelector(store => ({
    resetPasswordStatus: store.AUTH.resetPasswordStatus
  }))
  const history = useHistory()
  const {path} = useRouteMatch()
  useEffect(() => {
    history.replace({state:[{path}]})
    // eslint-disable-next-line
  }, [])
  
  const render = () => {
    if (resetPasswordStatus === 'loading')
      return <Preloader />

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
