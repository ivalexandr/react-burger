import {useState} from 'react'
import PropTypes from 'prop-types'
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import s from './style.module.css'

const BurgerIngredientsItem = ({srcImage, price, name, handleClickItem, item}) => {
  const [counter, setCounter] = useState(0)
  const handleClick = () => {
    handleClickItem && handleClickItem(item)
    setCounter(counter + 1)
  }
  return(
      <li className = {`${s.item} mr-3 mb-4`} onClick = {handleClick}>
          {counter ? <Counter count = {counter} /> : null}
          <div className = {s.img}>
            <img src = {srcImage} alt = {name}/>
          </div>
          <span className = {`${s.price} mt-1`}><span className = "mr-1">{price}</span> <CurrencyIcon type = "primary"/></span>
          <h3 className = {`${s.name} text text_type_main-default mt-1`}>{name}</h3>
      </li>
  )
}
BurgerIngredientsItem.propTypes = {
  srcImage:PropTypes.string.isRequired,
  price:PropTypes.number.isRequired,
  name:PropTypes.string.isRequired,
  handleClickCategory:PropTypes.func,
  item:PropTypes.object.isRequired
}
export default BurgerIngredientsItem