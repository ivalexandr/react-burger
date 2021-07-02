import React from 'react'
import { useRef } from 'react'
import { useAppDispatch } from '../../redux/hooks'
import { ConstructorElement,  DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd'
import { removeItem, sortArray } from '../../redux/constructor/constructorSlice'
import { TObjectIngredient } from '../../types'
import s from './style.module.css'
import { DropTarget } from 'dnd-core'


interface IBurgerConstructor{
  index?:any
  name:string
  image:string
  price:number
  isLocked?:boolean
  type?:'top' | 'bottom'
  ingredient?:TObjectIngredient
}

const BurgerConstructorItem: React.FC<IBurgerConstructor> = ({index, name, image, price, isLocked, type, ingredient }) => {

  const ref = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()

  const handleDrop = ( item: any, monitor:DropTargetMonitor ) => {
    if(item.ingredient === 'bun') return
    if(ingredient) return
    if(item.index !== index){
      dispatch(sortArray({idFrom:item.index, idTo:index}))
    }
  }
  const handleClickDelete = ():void => {
    dispatch(removeItem(index))
  }
  const [ , drag ] = useDrag({
    type:'ingredientsItem',
    item:{ index }
  })
  const [ , drop ] = useDrop ({
    accept:'ingredientsItem',
    drop(item:DropTarget, monitor){
        handleDrop(item, monitor)
    },
  })

  drag(drop(ref))
  
  return(
    <div className={`${s.item}`} ref = {ref}>
    <div className={s.icon}> { type !== 'top' && type !== 'bottom' ? <DragIcon type = "primary"/> : null }</div>
    <ConstructorElement
      type = {type}
      isLocked = {isLocked}
      text={name}
      thumbnail={image}
      price={price}
      handleClose = {handleClickDelete}
    />
  </div>
  )
}


export default BurgerConstructorItem