import AuthForm from '../components/AuthForm/AuthForm'
import Preloader from '../components/Preloader/Preloader'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Register = () => {
  const { status } = useSelector(store => ({
    user: store.AUTH.user,
    status: store.AUTH.status
  }))
  const render = () => {
    if (status === 'loading') {
      return <Preloader />
    } else if (status === 'success') {
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
