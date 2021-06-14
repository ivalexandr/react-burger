import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Input,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components'
import { getUserData, setUserData } from '../../redux/actions'
import s from './style.module.css'

const ProfileForm = () => {
  const dispatch = useDispatch()
  const { name, email } = useSelector(store => ({
    name: store.AUTH?.user?.user.name,
    email: store.AUTH?.user?.user.email,
  }))

  const [value, setValue] = useState({})

  useEffect(() => {
    dispatch(getUserData())
    setValue(prev => ({
      ...prev,
      name,
      email
    }))
    // eslint-disable-next-line
  }, [name])

  const changeHandler = e => {
    setValue(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  const clickHandlerSave = e => {
    e.preventDefault()
    dispatch(setUserData({ name: value.name, email: value.email }))
  }
  const clickHandlerCancel = e => {
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
        <Button type='secondary' size='large' onClick={clickHandlerCancel}>
          Отменить
        </Button>
        <Button onClick={clickHandlerSave}>Сохранить</Button>
      </div>
    </form>
  )
}
export default ProfileForm
