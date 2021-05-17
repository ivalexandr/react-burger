import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import s from './style.module.css'
import { PUSH__ITEM, SET__BUN, SET__BUNS, SET__INGREDIENT, SHOW__INGREDIENTS__DETAILS, PUSH__ITEM__DATA } from '../../redux/types'


const BurgerIngredientsItem = ({srcImage, price, name, item }) => {
  const dispatch = useDispatch()
  
  const handleClick = () => {
    dispatch({type:SET__INGREDIENT, payload:item})
    dispatch({type:SHOW__INGREDIENTS__DETAILS, payload:true})
    dispatch({ type: PUSH__ITEM__DATA, payload: item })
    if(item.type === 'bun'){
      dispatch({type:SET__BUN, payload:item})
      dispatch({type:SET__BUNS, payload:item})
    }else{
      dispatch({type:PUSH__ITEM, payload:item})
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
  item:PropTypes.object.isRequired,
}
export default BurgerIngredientsItem