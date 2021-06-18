import AuthForm from '../components/AuthForm/AuthForm'
import Preloader from '../components/Preloader/Preloader'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Register = () => {
  const { registerStatus } = useSelector(store => ({
    registerStatus: store.AUTH.registerStatus
  }))
  const render = () => {
    if (registerStatus === 'loading') {
      return <Preloader />
    } else if (registerStatus === 'success') {
      return <Redirect to='/' />
    }
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
