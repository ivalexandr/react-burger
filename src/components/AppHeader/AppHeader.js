import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import s from './style.module.css'
const AppHeader = () => {
return (
  <header className = {`${s.header} pt-2 pb-2`}>
      <div className = {`container ${s.wrapper}`}>
        <nav className = {s.menu}>
        <ul className = {s.list}>
          <li className = {`mr-1`}>
            <a href = "/" className = {`${s.link} text text_type_main-default`}>
              <BurgerIcon type = "primary"/>
              <span className = "ml-1">Конструктор</span>
            </a>
          </li>
          <li>
            <a href = "/" className = {`${s.link} text text_type_main-default`}>
              <ListIcon type = "secondary"/>
              <span className = {`${s.dark} ml-1`}>Лента заказов</span>
            </a>
          </li>
        </ul>
      </nav>
      <Logo />
      <a href = "/" className = {`${s.link} ${s.profile} text text_type_main-default`}>
      <ProfileIcon type = "secondary"/>
              <span className = {`${s.dark} ml-1`}>Личный кабинет</span>
      </a>
      </div>
  </header>
)
}
export default AppHeader