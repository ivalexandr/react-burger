import React from 'react'
import { useRef } from 'react'
import { useAppDispatch } from '../../redux/hooks'
import {
  ConstructorElement,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd'
import { removeItem, sortArray } from '../../redux/constructor/constructorSlice'
import { TObjectIngredient } from '../../types'
import s from './style.module.css'

interface IBurgerConstructor {
  index?: any
  name: string
  image: string
  price: number
  isLocked?: boolean
  type?: 'top' | 'bottom'
  ingredient?: TObjectIngredient
}

const BurgerConstructorItem: React.FC<IBurgerConstructor> = ({
  index,
  name,
  image,
  price,
  isLocked,
  type,
  ingredient
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()

  const handleClickDelete = (): void => {
    dispatch(removeItem(index))
  }

  const [{ isDrag }, drag] = useDrag({
    type: 'ingredientsItem',
    item: { index, type: ingredient?.type },
    collect(monitor) {
      return {
        isDrag: monitor.isDragging()
      }
    }
  })

  const [{ handlerId }, drop] = useDrop({
    accept: 'ingredientsItem',
    collect(monitor: DropTargetMonitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    hover(item:{index: any, type: string}, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return
      }

      if (item.index === undefined) return
      if (item.type === 'bun') return
      const dragIndex = item?.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      
      dispatch(
        sortArray({ idTo: hoverIndex, idFrom: dragIndex })
      )
      item.index = hoverIndex
    }
  })

  drag(drop(ref))
  const opacity: number = isDrag ? 0 : 1
  return (
    <div
      className={`${s.item}`}
      ref={ref}
      style={{ opacity: opacity }}
      data-handler-id={handlerId}>
      <div className={s.icon}>
        {' '}
        {type !== 'top' && type !== 'bottom' ? (
          <DragIcon type='primary' />
        ) : null}
      </div>
      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={name}
        thumbnail={image}
        price={price}
        handleClose={handleClickDelete}
      />
    </div>
  )
}

export default BurgerConstructorItem
