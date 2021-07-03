import React, { ReactElement, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import {
  wsConnectionClosed,
  wsConnectionStart
} from '../../redux/webSocket/wsSlice'
import {  getOrderItem } from '../../redux/actions'
import { TObjectIngredient } from '../../types'
import Preloader from '../Preloader/Preloader'
import s from './style.module.css'



interface IPropsOrderItem{
  id: string
}

const OrderItem:React.FC<IPropsOrderItem> = ({ id }) => {
  const urlAll = 'wss://norma.nomoreparties.space/orders/all'
  const dispatch = useAppDispatch()

  const {  ingredients, status, order } = useAppSelector(store => ({
    ingredients: store.INGREDIENTS.data,
    status: store.SOCKETS.statusGetOrder,
    order: store.SOCKETS.order
  }))

  useEffect(() => {
    // @ts-ignore: Unreachable code error
    dispatch(getOrderItem(id))
    // @ts-ignore: Unreachable code error
    dispatch(wsConnectionStart(urlAll))
    return () => {
      // @ts-ignore: Unreachable code error
      dispatch(wsConnectionClosed())
    }
    // eslint-disable-next-line
  }, [])
  
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
  const nowDate: Date = new Date()
  const dataString: string = `${nowDate.getFullYear()}-${nowDate.getDay() + 1 < 10 ? `0${nowDate.getDay() + 1}` : nowDate.getDay() + 1}-${nowDate.getDate() < 10 ? `0${nowDate.getDate()}` : nowDate.getDate()}`
  // @ts-ignore: Unreachable code error
  const dateOrder: string | undefined = order.createdAt?.slice(0,10)
  // @ts-ignore: Unreachable code error
  const timeOrder: string | undefined = order.createdAt?.slice(11, 19)

  const renderDate = (): string => {
    if(dataString === dateOrder) return `Сегодня, ${timeOrder} i-GMT+3`
    return `${dateOrder} i-GMT+3`
  }
  const render = ():ReactElement => {
    if(status === 'loading') return <Preloader />
    if(status === 'success') return (
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
              order?.ingredients.map((item:string, id:number) => {
                return (
                  <li className={`${s.item}`} key = {id}>
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
            {renderDate()}
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
    return <Preloader />
  }
  return render()
}

export default OrderItem
