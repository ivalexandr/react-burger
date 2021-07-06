import React, { useState } from 'react'
import { useAppDispatch } from '../../redux/hooks'
import {
  Input,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components'
import {
  loginUser,
  registerUser,
  resetPassword,
  resetPasswordSearch
} from '../../redux/actions'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import s from './style.module.css'
import { getCookie } from '../../services/cookie'

interface IPropsAuthForm{
  headingText: string
  type: string
  buttonText: string
  emailText?: string
  passText?: string
}
interface IStateValue{
  email?: string
  password?: string
  name?: string
  token?: string
}

const AuthForm: React.FC<IPropsAuthForm> = ({
  headingText,
  type,
  buttonText,
  emailText = 'E-mail',
  passText = 'Пароль'
}) => {
  const history = useHistory()
  const {state} = useLocation()
  const dispatch = useAppDispatch()
  const [value, setValue] = useState<IStateValue>({})

  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (type === 'login')
    // @ts-ignore: Unreachable code error
      dispatch(loginUser({ email: value.email, password: value.password }))
    if (type === 'register')
      dispatch(
        // @ts-ignore: Unreachable code error
        registerUser({
          email: value.email,
          password: value.password,
          name: value.name
        })
      )
    if (type === 'reset')
      dispatch(
        // @ts-ignore: Unreachable code error
        resetPassword({
          password: value.password,
          token: `Bearer ${getCookie('accessToken')}`
        })
      )
    if (type === 'forgot') {
      // @ts-ignore: Unreachable code error
      dispatch(resetPasswordSearch({ email: value.email }))
      // @ts-ignore: Unreachable code error
      history.replace({ pathname: '/reset-password', state:[...state] })
    }
  }
  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  const registerText = (): object => {
    return (
      <span className='text text_type_main-default'>
        Уже зарегистрированы?{' '}
        <NavLink className={s.link} to='/login'>
          Войти
        </NavLink>
      </span>
    )
  }
  const loginText = (): object => {
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
          <NavLink className={s.link} to='/forgot-password' exact>
            Восстановить
          </NavLink>
        </span>
      </>
    )
  }
  const forgotText = (): object => {
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
                value={value.token || ''}
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

export default AuthForm
