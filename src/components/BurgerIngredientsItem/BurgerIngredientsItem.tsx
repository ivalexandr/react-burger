import React, { MouseEvent } from 'react'
import { useState, useEffect } from 'react'
import { useAppSelector } from '../../redux/hooks'
import {
  Counter,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag } from 'react-dnd'
import cn from 'classnames'
import { useLocation, useHistory } from 'react-router-dom'
import { TObjectIngredient, TObjectItemDnd } from '../../types'
import s from './style.module.css'

interface IPropsIngredient {
  srcImage: string
  price: number
  name: string
  ingredient: TObjectIngredient
  id: number | string
}

const BurgerIngredientsItem: React.FC<IPropsIngredient> = ({
  srcImage,
  price,
  name,
  ingredient,
  id
}) => {
  const location = useLocation()
  const history = useHistory()

  const ingredients = useAppSelector(store => store.CONSTRUCTOR.data)
  const [counter, setCounter] = useState<number | null>(null)

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient',
    item: { id, ingredient },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
      ingredientItem: monitor.getItem()
    }),
    end(itemId: TObjectItemDnd) {
      handleDrop(itemId)
    }
  })
  useEffect(() => {
    setCounter(ingredients.filter(item => item._id === ingredient._id).length)
    // eslint-disable-next-line
  }, [ingredients])
  const handleDrop = (itemId: any): void => {
    setCounter(ingredients.filter(item => item._id === itemId.id).length)
  }
  const clickHandler: React.EventHandler<MouseEvent> = (): void => {
    history.push({
      pathname: `/ingredients/${id}`,
      state: { background: location }
    })
  }
  return (
    <li
      onClick={clickHandler}
      className={cn(s.item, 'mr-3', 'mb-4', { [s.active]: isDrag })}
      ref={dragRef}
      draggable
      data-cy='li-test'>
      {ingredient.type === 'bun' ? null : counter ? (
        <Counter count={counter} />
      ) : null}
      <div className={s.img}>
        <img src={srcImage} alt={name} />
      </div>
      <span className={`${s.price} mt-1`}>
        <span className='mr-1'>{price}</span> <CurrencyIcon type='primary' />
      </span>
      <h3 className={`text text_type_main-default mt-1`}>{name}</h3>
    </li>
  )
}

export default BurgerIngredientsItem
