import { useSelector } from 'react-redux'
import AuthForm from '../components/AuthForm/AuthForm'
import { Redirect } from 'react-router-dom'
import Preloader from '../components/Preloader/Preloader'

const Login = () => {
  const { status } = useSelector(store => ({
    status: store.AUTH.status,
  }))
  
  const render = () => {
    if (status === 'loading') {
      return <Preloader />
    } else if (status === 'success') {
      return <Redirect to = {'/'} />
    }
    return <AuthForm type='login' headingText='Вход' buttonText='Войти' />
  }
  return render()
}
export default Login
