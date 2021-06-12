import { useEffect } from 'react'
import AuthForm from '../components/AuthForm/AuthForm'
import Preloader from '../components/Preloader/Preloader'
import { Redirect, useHistory, useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'


const ForgotPassword = () => {
  const { status } = useSelector(store => ({
    user: store.AUTH.user,
    status: store.AUTH.status
  }))
  const history = useHistory()
  const {path} = useRouteMatch()
  useEffect(() => {
    history.replace({state:[{path}]})
    // eslint-disable-next-line
  }, [])
  
  const render = () => {
    if (status === 'loading') {
      return <Preloader />
    } else if (status === 'success') {
      return <Redirect to='/' />
    }
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
