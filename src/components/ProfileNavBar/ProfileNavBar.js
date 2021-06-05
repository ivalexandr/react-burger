import {NavLink} from 'react-router-dom'
import s from './style.module.css'

const ProfileNavBar = () => {
    return(
        <div className={`${s.navbar} mr-15`}>
            <NavLink exact to={'/profile'} className={s.link} activeClassName={s.active}>Профиль</NavLink>
            <NavLink exact to={'/profile/orders'} className={s.link} activeClassName={s.active}>История заказов</NavLink>
            <NavLink to={'/'} className={s.link}>Выход</NavLink>
            <div className = "text text_type_main-default text_color_inactive mt-20">
                В этом разделе вы можете изменить свои персональные данные
            </div>
        </div>
    )
}

export default ProfileNavBar