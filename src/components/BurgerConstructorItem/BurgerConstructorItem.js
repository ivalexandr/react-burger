import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { ConstructorElement,  DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag, useDrop } from 'react-dnd'
import PropTypes from 'prop-types'
import { removeItem, sortArray } from '../../redux/constructor/constructorSlice'
import s from './style.module.css'


const BurgerConstructorItem = ({index, name, image, price, isLocked, type, ingredient, item }) => {
  const ref = useRef()
  const dispatch = useDispatch()
  const handleDrop = ( item ) => {
    if(item.ingredient === 'bun') return
    if(ingredient) return
    if(item.index !== index){
      dispatch(sortArray({idFrom:item.index, idTo:index}))
    }
  }
  const handleClickDelete = () => {
    dispatch(removeItem(index))
  }
  const [ , drag ] = useDrag({
    type:'ingredientsItem',
    item:{ index }
  })
  const [ , drop ] = useDrop({
    accept:'ingredientsItem',
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
  index:PropTypes.number,
  name:PropTypes.string,
  image:PropTypes.string,
  price:PropTypes.number,
  isLocked:PropTypes.string,
  type:PropTypes.string,
  item:PropTypes.object,
}

export default BurgerConstructorItem