import { useSelector } from 'react-redux'
import Preloader from '../components/Preloader/Preloader'
import { useLocation, Redirect } from 'react-router-dom'
import AuthForm from '../components/AuthForm/AuthForm'

const ResetPassword = () => {
  const { resetPasswordStatus } = useSelector(store => ({
    resetPasswordStatus: store.AUTH.resetPasswordStatus
  }))
  const { state } = useLocation()
  const render = () => {
    if (resetPasswordStatus === 'loading') {
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
