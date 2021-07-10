import React from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  Button,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import { DropTargetMonitor, useDrop } from 'react-dnd'
import cn from 'classnames'
import BurgerConstructorItem from '../BurgerConstructorItem/BurgerConstructorItem'
import { showOrderModal } from '../../redux/modal/modalSlice'
import {
  pushItem,
  setBun,
  setBuns,
  checkBunEmpty,
} from '../../redux/constructor/constructorSlice'
import { getOrderNumber } from '../../redux/actions'
import { useHistory, useLocation } from 'react-router-dom'
import { TObjectIngredient, TObjectItemDnd } from '../../types'
import s from './style.module.css'

const BurgerConstructor: React.FC = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const location = useLocation()
  const { bun, dataConstructor, ingredients, isBunEmpty, user } =
    useAppSelector(store => ({
      bun: store.CONSTRUCTOR.bun,
      dataConstructor: store.CONSTRUCTOR.data,
      ingredients: store.INGREDIENTS.data,
      isBunEmpty: store.CONSTRUCTOR.isBunEmpty,
      user: store.AUTH?.user
    }))
  const onDropHandler = (itemId: any): void => {
    const [item]: Array<TObjectIngredient> = ingredients.filter(
      (item: TObjectIngredient): boolean => item._id === itemId.ingredient._id
    )
    if (item.type === 'bun') {
      dispatch(setBun(item))
      dispatch(setBuns(item))
      dispatch(checkBunEmpty(false))
    } else {
      dispatch(pushItem(item))
    }
  }
  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(itemId: TObjectItemDnd) {
      onDropHandler(itemId)
    },
    collect: (monitor: DropTargetMonitor) => ({
      isHover: monitor.isOver()
    })
  })
  const calcTotalCost = (): number => {
    let accumulator: number = 0
    if (!dataConstructor.length) {
      return 0
    }
    accumulator = dataConstructor.reduce(
      (acc: any, item: TObjectIngredient): any => {
        if (item.type === 'bun') {
          return +acc + +item.price * 2
        }
        return +acc + +item.price
      },
      [0]
    )
    return accumulator
  }
  const handleClickButton = (): void => {
    if (!dataConstructor.length) return
    if (!bun) {
      dispatch(checkBunEmpty(true))
      return
    }
    if (!user) {
      history.push({ pathname: '/login', state: location })
      return
    }
    dispatch(checkBunEmpty(false))
    dispatch(getOrderNumber(dataConstructor))
    dispatch(showOrderModal(true))
  }

  return (
    <section
      className={cn(s.section, { [s.active]: isHover })}
      ref={dropTarget}
      data-cy='dnd-target'>
      {bun ? (
        <BurgerConstructorItem
          type='top'
          isLocked={true}
          name={bun.name}
          image={bun.image_mobile}
          price={bun.price}
          ingredient={bun}
        />
      ) : null}
      <div className={`${s.constructor} mb-1 mt-1`}>
        {dataConstructor.map(
          (item: TObjectIngredient, index: number): object | null => {
            if (item.type !== 'bun') {
              return (
                <BurgerConstructorItem
                  key={item.key}
                  index={index}
                  name={item.name}
                  image={item.image_mobile}
                  price={item.price}
                  ingredient={item}
                />
              )
            }
            return null
          }
        )}
      </div>
      {bun ? (
        <BurgerConstructorItem
          type='bottom'
          isLocked={true}
          name={bun.name}
          image={bun.image_mobile}
          price={bun.price}
          ingredient={bun}
        />
      ) : null}
      <div className={`${s.total} mt-5`}>
        <span className={`${s.price} text mr-5`}>
          <output className='mr-1'>{calcTotalCost()}</output>
          <CurrencyIcon type='primary' />
        </span>
        <Button type='primary' size='medium' onClick={handleClickButton}>
          Оформить заказ
        </Button>
      </div>
      {isBunEmpty && <div className={s.message}>Необходимо выбрать булку!</div>}
    </section>
  )
}

export default BurgerConstructor
