import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  Input,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components'
import { getUserData, setUserData } from '../../redux/actions'
import s from './style.module.css'

interface IFormState {
  name?: string
  email?: string
  password?: string
}

const ProfileForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const { name, email } = useAppSelector(store => ({
    name: store.AUTH?.user!.user!.name,
    email: store.AUTH?.user!.user!.email
  }))

  const [value, setValue] = useState<IFormState>({})

  useEffect(() => {
    dispatch(getUserData())
    setValue(prev => ({
      ...prev,
      name,
      email
    }))
    // eslint-disable-next-line
  }, [name])

  const changeHandler: React.ChangeEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setValue(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  const clickHandlerSave = (e: any): void => {
    e.preventDefault()
    dispatch(setUserData({ name: value.name, email: value.email }))
  }
  const clickHandlerCancel = (e: any): void => {
    e.preventDefault()
    setValue(prev => ({
      ...prev,
      name,
      email
    }))
  }

  return (
    <form action='#' className='ml-15'>
      <div className={`${s.wrapper} mb-6`}>
        <Input
          value={value.name || ''}
          onChange={changeHandler}
          type='text'
          name='name'
          placeholder='Имя'
          icon='EditIcon'
        />
      </div>
      <div className={`${s.wrapper} mb-6`}>
        <Input
          value={value.email || ''}
          onChange={changeHandler}
          type='email'
          name='email'
          placeholder='Логин'
          icon='EditIcon'
        />
      </div>
      <div className={`${s.wrapper} mb-6`}>
        <Input
          value={value.password || ''}
          onChange={changeHandler}
          type='password'
          name='password'
          placeholder='Пароль'
          icon='EditIcon'
        />
      </div>
      <div className={`${s.wrapper} mb-6`}>
        <Button
          type='secondary'
          size='large'
          // @ts-ignore: Unreachable code error
          onClick={clickHandlerCancel}>
          Отменить
        </Button>
        <Button
          // @ts-ignore: Unreachable code error
          onClick={clickHandlerSave}>
          Сохранить
        </Button>
      </div>
    </form>
  )
}
export default ProfileForm
