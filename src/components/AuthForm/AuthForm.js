import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Input,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components'
import {  loginUser, registerUser, resetPassword, resetPasswordSearch } from '../../redux/actions'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import s from './style.module.css'
import { setCookie } from '../../services/cookie'

const AuthForm = ({
  headingText,
  type,
  buttonText,
  emailText = 'E-mail',
  passText = 'Пароль',
}) => {
  const dispatch = useDispatch()
  const [value, setValue] = useState({})
  const onSubmitHandler = e => {
    e.preventDefault()
    if(type === 'login') dispatch(loginUser({email:value.email,password:value.password}))
    if(type === 'register')dispatch(registerUser({email:value.email,password:value.password,name:value.name}))
    if(type === 'reset') dispatch(resetPassword({password:value.password,token:`Bearer ${setCookie('accessToken')}`}))
    if(type === 'forgot') dispatch(resetPasswordSearch({email:value.email}))
} 
  const onChangeHandler = e => {
      setValue((prev) => ({
        ...prev,
        [e.target.name]:e.target.value
      }))
  }
  const registerText = () => {
    return (
      <span className='text text_type_main-default'>
        Уже зарегистрированы?{' '}
        <NavLink className={s.link} to='/login'>
          Войти
        </NavLink>
      </span>
    )
  }
  const loginText = () => {
    return (
      <>
        <span className='text text_type_main-default'>
          Вы - новый пользователь?{' '}
          <NavLink className={s.link} to='/register'>
            Зарегистрироваться
          </NavLink>
        </span>
        <span className='text text_type_main-default mt-3'>
          Забыли пароль?{' '}
          <NavLink className={s.link} to='/forgot-password'>
            Восстановить
          </NavLink>
        </span>
      </>
    )
  }
  const forgotText = () => {
    return (
      <span className='text text_type_main-default'>
        Вспомнили пароль?{' '}
        <NavLink className={s.link} to='/login'>
          Войти
        </NavLink>
      </span>
    )
  }
  return (
    <>
      <div className={s.wrapper}>
        <h2 className={'text text_type_main-medium'}>{headingText}</h2>
        <form action='#' className={s.form} onSubmit={onSubmitHandler}>
          {type === 'register' ? (
            <div className='mt-3'>
              <Input
                type='text'
                placeholder={'Имя'}
                name='name'
                onChange={onChangeHandler}
                value={value.name || ''}
              />
            </div>
          ) : null}
          {type === 'reset' ? null : (
            <div className='mt-3'>
              <Input
                type='email'
                placeholder={emailText}
                name='email'
                onChange={onChangeHandler}
                value={value.email || ''}
              />
            </div>
          )}
          {type === 'forgot' ? null : (
            <div className='mt-3'>
              <Input
                type='password'
                placeholder={passText}
                icon='ShowIcon'
                name='password'
                onChange={onChangeHandler}
                value={value.password || ''}
              />
            </div>
          )}
          {type === 'reset' ? (
            <div className='mt-3'>
              <Input
                type='text'
                placeholder='Введите текст из письма'
                name='token'
                onChange={onChangeHandler}
                value={value.reset || ''}
              />
            </div>
          ) : null}
          <div className='mt-3'>
            <Button type='primary'>{buttonText}</Button>
          </div>
        </form>
        {type === 'register'
          ? registerText()
          : type === 'login'
          ? loginText()
          : type === 'forgot' || type === 'reset'
          ? forgotText()
          : null}
      </div>
    </>
  )
}

AuthForm.propTypes = {
  headingText: PropTypes.string,
  type: PropTypes.string,
  buttonText: PropTypes.string,
  emailText: PropTypes.string,
  passText: PropTypes.string,
}

export default AuthForm
