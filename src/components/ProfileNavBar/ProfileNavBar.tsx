import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAppDispatch } from '../../redux/hooks'
import { logoutUser } from '../../redux/actions'
import s from './style.module.css'

const ProfileNavBar: React.FC = () => {
  const dispatch = useAppDispatch()
  const clickHandler: React.MouseEventHandler = (): void => {
    dispatch(logoutUser())
  }
  return (
    <div className={`${s.navbar} mr-15`}>
      <NavLink
        exact
        to={'/profile'}
        className={s.link}
        activeClassName={s.active}>
        Профиль
      </NavLink>
      <NavLink
        exact
        to={'/profile/orders'}
        className={s.link}
        activeClassName={s.active}>
        История заказов
      </NavLink>
      <NavLink to={'/login'} className={s.link} onClick={clickHandler}>
        Выход
      </NavLink>
      <div className='text text_type_main-default text_color_inactive mt-20'>
        В этом разделе вы можете изменить свои персональные данные
      </div>
    </div>
  )
}

export default ProfileNavBar
