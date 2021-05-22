import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {  SET__INGREDIENT, SHOW__INGREDIENTS__DETAILS } from '../../redux/types'
import { useDrag } from 'react-dnd'
import cn from 'classnames'
import s from './style.module.css'

const BurgerIngredientsItem = ({srcImage, price, name, ingredient, id }) => {
  const dispatch = useDispatch()
  const ingredients = useSelector(store => store.totalCost.total)
  const [counter, setCounter] = useState(null)
  const [{ isDrag }, dragRef] = useDrag({
    type:'ingredient',
    item:{id, ingredient},
    collect:monitor => ({
      isDrag:monitor.isDragging(),
      ingredientItem:monitor.getItem()
    }),
    end(itemId){
      handleDrop(itemId)
    }
  })
  useEffect(() => {
      setCounter(
      ingredients.filter(item => item._id === ingredient._id).length
    )
    // eslint-disable-next-line
  }, [ingredients])
  const handleDrop =(itemId) => {
    setCounter( 
      ingredients.filter(item => item._id === itemId.id).length
    )
  }
  const handleClick = () => {
    dispatch({type:SET__INGREDIENT, payload:ingredient})
    dispatch({type:SHOW__INGREDIENTS__DETAILS, payload:true})
  }
  return(
      <li className = {cn(s.item,'mr-3','mb-4' ,{[s.active]:isDrag })} onClick = {handleClick} ref = {dragRef} draggable>
          {ingredient.type === 'bun' ? null : counter ? <Counter count = {counter} /> : null } 
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
  ingredient:PropTypes.object.isRequired,
  id:PropTypes.string
}
export default BurgerIngredientsItem