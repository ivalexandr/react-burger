import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {  SET__INGREDIENT, SHOW__INGREDIENTS__DETAILS } from '../../redux/types'
import { useDrag } from 'react-dnd'
import cn from 'classnames'
import s from './style.module.css'


const BurgerIngredientsItem = ({srcImage, price, name, item, id }) => {
  const dispatch = useDispatch()
  const ingredients = useSelector(store => store.totalCost.total,)
  const [counter, setCounter] = useState(ingredients.length)
  const [{ isDrag }, dragRef] = useDrag({
    type:'ingredient',
    item:{id, item},
    collect:monitor => ({
      isDrag:monitor.isDragging(),
      didDrop:monitor.didDrop(),
    }),
    end(itemId){
      handleDrop(itemId)
    }
  })
  const handleDrop = (item) => {
    setCounter(calcCounter(item))
  }
  const calcCounter = (ingredient) => {
    return ingredients.filter(item => item._id === ingredient.id).length
  }

  const handleClick = () => {
    dispatch({type:SET__INGREDIENT, payload:item})
    dispatch({type:SHOW__INGREDIENTS__DETAILS, payload:true})
    
  }
  
  return(
      <li className = {cn(s.item,'mr-3','mb-4' ,{[s.active]:isDrag })} onClick = {handleClick} ref = {dragRef} draggable>
          <Counter count = {counter} />
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
  id:PropTypes.string
}
export default BurgerIngredientsItem