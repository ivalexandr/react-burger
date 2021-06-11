import {NavLink} from 'react-router-dom'
import { useDispatch } from "react-redux";
import s from './style.module.css'
import {logoutUser} from "../../redux/actions";
import {setCookie} from "../../services/cookie";

const ProfileNavBar = () => {
    const dispatch = useDispatch()
    const clickHandler = () => {
        dispatch(logoutUser({token:localStorage.getItem('refreshToken')}))
        localStorage.setItem('refreshToken', '')
        setCookie('accessToken', '')
    }
    return(
        <div className={`${s.navbar} mr-15`}>
            <NavLink exact to={'/profile'} className={s.link} activeClassName={s.active}>Профиль</NavLink>
            <NavLink exact to={'/profile/orders'} className={s.link} activeClassName={s.active}>История заказов</NavLink>
            <NavLink to={'/'} className={s.link} onClick={clickHandler}>Выход</NavLink>
            <div className = "text text_type_main-default text_color_inactive mt-20">
                В этом разделе вы можете изменить свои персональные данные
            </div>
        </div>
    )
}

export default ProfileNavBar