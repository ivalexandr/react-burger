import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import {
  wsConnectionClosed,
  wsConnectionStart
} from '../../redux/webSocket/wsSlice'
import { getIngredients } from '../../redux/actions'
import { TObjectIngredient, TObjectOrder } from '../../types'
import s from './style.module.css'


interface IPropsOrderItem{
  id: string
}

const OrderItem:React.FC<IPropsOrderItem> = ({ id }) => {
  const urlAll = 'wss://norma.nomoreparties.space/orders/all'
  const dispatch = useAppDispatch()

  const { data, ingredients } = useAppSelector(store => ({
    data: store.SOCKETS.data,
    ingredients: store.INGREDIENTS.data
  }))

  useEffect(() => {
    dispatch(getIngredients())
    // @ts-ignore: Unreachable code error
    dispatch(wsConnectionStart(urlAll))
    return () => {
      // @ts-ignore: Unreachable code error
      dispatch(wsConnectionClosed())
    }
    // eslint-disable-next-line
  }, [])
  const order = data.filter((item: TObjectOrder) => item.number === id)[0]

  const calcTotal = (ingredientsId: Array<string>, ingredients: Array<TObjectIngredient>): number => {
    const total = ingredientsId && ingredientsId.reduce(
      (acc:any, item) => {
        if(ingredients.filter(ingredient => ingredient._id === item)[0].type === 'bun') return +acc + ingredients.filter(ingredient => ingredient._id === item)[0].price*2
        return (
          +acc +
          +ingredients.filter(ingredient => ingredient._id === item)[0].price
        )
      },
      [0]
    )
  return total
}

  const filterToIngredients = (ingredients: Array<TObjectIngredient>, id: string, type: 'image' | 'name' | 'price'):string => {
    const ingredient =
      ingredients && ingredients.filter(item => item._id === id)[0][type]
    return ingredient.toString()
  }

  return (
    <div className={s.wrapper}>
      <div className={s.info}>
        <div className={`${s.header} text text_type_digits-default mb-10`}>
          #{id}
        </div>
        <div className={`mb-10`}>
          <h3 className={`text text_type_main-medium mb-3`}>{
          // @ts-ignore: Unreachable code error
          order?.name
          }</h3>
          <span className={`${s.status} mb-15`}>
            {
              // @ts-ignore: Unreachable code error
            order?.status === 'created' ? (
              <span className={`${s.canceled} text text_type_main-small`}>
                создан
              </span>
            ) : 
            // @ts-ignore: Unreachable code error
            order?.status === 'done' ? (
              <span className={`${s.done} text text_type_main-small`}>
                Выполнен
              </span>
            ) : 
            // @ts-ignore: Unreachable code error
            order?.status === 'pending' ? (
              <span className={`${s.preparing} text text_type_main-small`}>
                Готовится
              </span>
            ) : null}
          </span>
          <div className={`${s.structure}`}>
            <h3 className='text text_type_main-medium mb-6'>Состав:</h3>
            <ul className={`${s.list}`}>
              {
              // @ts-ignore: Unreachable code error
              order?.ingredients.map((item:string) => {
                return (
                  <li className={`${s.item}`}>
                    <div className={s.img}>
                      <img
                        src={filterToIngredients(ingredients, item, 'image')}
                        alt=''
                      />
                    </div>
                    <span>
                      {filterToIngredients(ingredients, item, 'name')}
                    </span>
                    <span className={s.price}>
                      {' '}
                      1 x {filterToIngredients(ingredients, item, 'price')}{' '}
                      <CurrencyIcon type='primary' />{' '}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <div className={`${s.footer}`}>
          <span className='text text_type_main-default text_color_inactive'>
            Вчера, 13:50 i - GMT+3
          </span>
          <span className={`${s.total}`}>
            {calcTotal(
              // @ts-ignore: Unreachable code error
              order?.ingredients,
              ingredients)}{' '}
            <CurrencyIcon type={'primary'} />
          </span>
        </div>
      </div>
    </div>
  )
}

export default OrderItem
