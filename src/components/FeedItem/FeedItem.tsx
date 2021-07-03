import React from 'react'
import { useRouteMatch, Link, useLocation } from 'react-router-dom'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { TObjectIngredient } from '../../types'
import s from './style.module.css'


interface IPropsFeedItem{
  id: number | string
  status: string
  ingredientsId: Array<string>
  ingredients:Array<TObjectIngredient>
  name: string
  date?: string
}

const FeedItem: React.FC<IPropsFeedItem> = ({ id, status, ingredientsId, ingredients, name, date }) => {
  const { path } = useRouteMatch()
  const location = useLocation()

  const ingredientsImages = ingredientsId.map(item => {
    return ingredients.filter(ingredient => ingredient._id === item)[0].image
  })

  const calcTotal = (ingredientsId: Array<string>, ingredients:Array<TObjectIngredient>): number => {
    const total =
      ingredientsId &&
      ingredientsId.reduce(
        (acc: any, item) => {
          if (
            ingredients.filter(ingredient => ingredient._id === item)[0]
              .type === 'bun'
          )
            return (
              +acc +
              ingredients.filter(ingredient => ingredient._id === item)[0]
                .price *
                2
            )
          return (
            +acc +
            +ingredients.filter(ingredient => ingredient._id === item)[0].price
          )
        },
        [0]
      )
    return total
  }
  const nowDate: Date = new Date()
  const dataString: string = `${nowDate.getFullYear()}-${nowDate.getDay() + 1 < 10 ? `0${nowDate.getDay() + 1}` : nowDate.getDay() + 1}-${nowDate.getDate() < 10 ? `0${nowDate.getDate()}` : nowDate.getDate()}`
  const dateOrder: string | undefined = date?.slice(0,10)
  const timeOrder: string | undefined = date?.slice(11, 19) 

  const renderDate = (): string => {
    if(dataString === dateOrder) return `Сегодня, ${timeOrder} i-GMT+3`
    return `${dateOrder} i-GMT+3`
  }

  return (
    <Link
      to={{ pathname: `${path}/${id}`, state: { background: location } }}
      className={`${s.wrapper} p-6 mt-4`}>
      <div className={`${s.header} mb-6`}>
        <span className='text text_type_digits-default'>#{id}</span>
        <span className='text text_type_main-default text_color_inactive'>
          {renderDate()}
        </span>
      </div>
      <div className={`${s.body} mb-6`}>{name}</div>
      {status === 'created' ? (
        <span className={`${s.canceled} text text_type_main-small`}>
          создан
        </span>
      ) : status === 'done' ? (
        <span className={`${s.done} text text_type_main-small`}>Выполнен</span>
      ) : status === 'pending' ? (
        <span className={`${s.preparing} text text_type_main-small`}>
          Готовится
        </span>
      ) : null}
      <div className={`${s.footer} mt-6`}>
        <div className={s.images}>
          {ingredientsImages.map((item, id) => {
            if (id < 5) {
              return (
                <div key={id} className={s.round}>
                  {' '}
                  <img src={item} alt=''></img>{' '}
                </div>
              )
            }
            return null
          })}
          {ingredientsImages.length > 5 ? (
            <div className={s.round_more}>
              <img src={ingredientsImages[5]} alt='' />
              <span className='text text_type_digits-default'>
                +{ingredientsImages.length - 5}
              </span>
            </div>
          ) : null}
        </div>
        <span className={`${s.price} text text_type_digits-default`}>
          {calcTotal(ingredientsId, ingredients)}
          <CurrencyIcon type='primary' />
        </span>
      </div>
    </Link>
  )
}

export default FeedItem
