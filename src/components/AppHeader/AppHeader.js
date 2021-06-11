import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {NavLink, useRouteMatch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUserData, refreshToken} from "../../redux/actions";
import s from './style.module.css'


const AppHeader = () => {
    const dispatch = useDispatch()
    const dataUser = useSelector(store => store.PROFILE.dataUser)
    const main = useRouteMatch('/')
    const feed = useRouteMatch('/feed')
    const profile = useRouteMatch('/profile')
    const profileOrders = useRouteMatch('/profile/orders')
    const clickHandler = () => {
        dispatch(getUserData())
        // if(!dataUser.success){
        //     refreshToken()
        //     dispatch(getUserData())
        // }
    }
return (
  <header className = {`${s.header} pt-2 pb-2`}>
      <div className = {`container ${s.wrapper}`}>
        <nav className = {s.menu}>
        <ul className = {s.list}>
          <li className = {`mr-1`}>
            <NavLink exact to = "/" className = {`${s.link} text text_type_main-default`} activeClassName={s.active}>
              <BurgerIcon type ={main && main.isExact ? 'primary' : 'secondary'}/>
              <span className = "ml-1">Конструктор</span>
            </NavLink>
          </li>
          <li>
            <NavLink exact to = "/feed" className = {`${s.link} text text_type_main-default`} activeClassName={s.active}>
              <ListIcon type ={feed && feed.isExact ? 'primary' : 'secondary'}/>
              <span className = {`${s.dark} ml-1`}>Лента заказов</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <Logo />
      <NavLink onClick={clickHandler} to = "/profile" className = {`${s.link} ${s.profile} text text_type_main-default`} activeClassName={s.active}>
          <ProfileIcon type ={(profile && profile.isExact) || (profile && profileOrders.isExact) ? 'primary' : 'secondary'}/>
              <span className = {`${s.dark} ml-1`}>Личный кабинет</span>
      </NavLink>
      </div>
  </header>
)
}
export default AppHeader