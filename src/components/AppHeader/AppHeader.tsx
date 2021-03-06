import React from 'react'
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {match, NavLink, useRouteMatch, Link} from "react-router-dom";
import s from './style.module.css'

type TMatchApp = match<{}> | null

const AppHeader: React.FC = () => {
    const main: TMatchApp = useRouteMatch('/')
    const feed: TMatchApp = useRouteMatch('/feed')
    const feedId: TMatchApp = useRouteMatch('/feed/:id')
    const profile: TMatchApp = useRouteMatch('/profile')
    const profileOrders: TMatchApp = useRouteMatch('/profile/orders')
    const profileOrdersItem: TMatchApp = useRouteMatch('/profile/orders/:id')
return (
  <header className = {`${s.header} pt-2 pb-2`}>
      <div className = {`container ${s.wrapper}`}>
        <nav className = {s.menu}>
        <ul className = {s.list}>
          <li className = {`mr-1`}>
            <NavLink exact to = {{pathname:'/'}} className = {`${s.link} text text_type_main-default`} activeClassName={s.active}>
              <BurgerIcon type ={main && main?.isExact ? 'primary' : 'secondary'}/>
              <span className = "ml-1">Конструктор</span>
            </NavLink>
          </li>
          <li>
            <NavLink to = {{pathname:"/feed"}} className = {`${s.link} text text_type_main-default`} activeClassName={s.active}>
              <ListIcon type ={(feed && feed?.isExact) ||  (feed && feedId?.isExact) ? 'primary' : 'secondary'} />
              <span className = {`${s.dark} ml-1`}>Лента заказов</span>
            </NavLink>
          </li>
        </ul>
      </nav>
        <Link to = "/">
          <Logo />
        </ Link>
      <NavLink to = {{pathname:"/profile"}} className = {`${s.link} ${s.profile} text text_type_main-default`} activeClassName={s.active}>
          <ProfileIcon type ={(profile && profile?.isExact) || (profile && profileOrders?.isExact) || (profile && profileOrdersItem?.isExact) ? 'primary' : 'secondary'}/>
              <span className = {`${s.dark} ml-1`}>Личный кабинет</span>
      </NavLink>
      </div>
  </header>
)
}
export default AppHeader