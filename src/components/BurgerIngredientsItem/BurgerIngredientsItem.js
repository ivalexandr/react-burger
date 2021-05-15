import { useContext } from 'react'
import PropTypes from 'prop-types'
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import { TotalCostContext } from '../../Context/TotalCost/context'
import s from './style.module.css'
import { PUSH__ITEM, SET__BUNS } from '../../Context/types'


const BurgerIngredientsItem = ({srcImage, price, name, handleClickItem, item }) => {
  const { totalCostDispatch } = useContext(TotalCostContext)
  const handleClick = () => {
    handleClickItem && handleClickItem(item)
    if(item.type === 'bun'){
      totalCostDispatch({type:SET__BUNS, payload:item})
    }else{
      totalCostDispatch({type:PUSH__ITEM, payload:item})
    }
  }
  return(
      <li className = {`${s.item} mr-3 mb-4`} onClick = {handleClick}>
          <Counter count = {0} />
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