import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { ConstructorElement,  DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag, useDrop } from 'react-dnd'
import PropTypes from 'prop-types'
import s from './style.module.css'
import { REMOVE__ITEM__DATA__COST, SORT__ARRAY, REMOVE__ITEM } from '../../redux/types'

const BurgerConstructorItem = ({id, name, image, price, isLocked, type, ingredient, item }) => {
  const ref = useRef()
  const dispatch = useDispatch()
  const handleDrop = ( item ) => {
    if(item.ingredient === 'bun') return
    if(ingredient) return
    if(item.id !== id){
        dispatch({type:SORT__ARRAY, payload:{idFrom:item.id, idTo:id}})
    }
  }
  const handleClickDelete = () => {
    dispatch({type:REMOVE__ITEM__DATA__COST, payload:item._id})
    dispatch({type:REMOVE__ITEM, payload:id})
  }
  const [ , drag ] = useDrag({
    type:'ingredientsItem',
    item:{ id, ingredient }
  })
  const [ , drop ] = useDrop({
    accept:'ingredientsItem',
    collect:monitor => ({
      handlerId:monitor.getHandlerId,
    }),
    drop(item, monitor){
        handleDrop(item, monitor)
    },
  })

  drag(drop(ref))
  
  return(
    <div className={`${s.item}`} ref = {ref}>
    <div className={s.icon}> { type !== 'top' && type !== 'bottom' ? <DragIcon /> : null }</div>
    <ConstructorElement
      type = {type}
      isLocked = {isLocked}
      text={name}
      thumbnail={image}
      price={price}
      handleClose = {handleClickDelete}
      draggable
    />
  </div>
  )
}
BurgerConstructorItem.propTypes = {
  id:PropTypes.number,
  name:PropTypes.string,
  image:PropTypes.string,
  price:PropTypes.number,
  isLocked:PropTypes.string,
  type:PropTypes.string,
  item:PropTypes.object,
}

export default BurgerConstructorItem