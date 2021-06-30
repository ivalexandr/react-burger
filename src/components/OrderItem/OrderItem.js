import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import {
  wsConnectionClosed,
  wsConnectionStart
} from '../../redux/webSocket/wsSlice'

import s from './style.module.css'
import { getIngredients } from '../../redux/actions'

const OrderItem = ({ id }) => {
  const dispatch = useDispatch()

  const { data, ingredients } = useSelector(store => ({
    data: store.SOCKETS.data,
    ingredients: store.INGREDIENTS.data
  }))

  useEffect(() => {
    dispatch(getIngredients())
    dispatch(wsConnectionStart())
    return () => {
      dispatch(wsConnectionClosed())
    }
    // eslint-disable-next-line
  }, [])
  const order = data.filter(item => item.number === id)[0]
  
  const calcTotal = (ingredientsId, ingredients) => {
      const total = ingredientsId && ingredientsId.reduce(
        (acc, item) => {
          return (
            +acc +
            +ingredients.filter(ingredient => ingredient._id === item)[0].price
          )
        },
        [0]
      )
    return total
  }

  const filterToIngredients = (ingredients, id, type) => {
    const ingredient = ingredients && ingredients.filter(item => item._id === id)[0][type]
    return ingredient
  }

  return (
    <div className={s.wrapper}>
      <div className={s.info}>
        <div className={`${s.header} text text_type_digits-default mb-10`}>
          #{id}
        </div>
        <div className={`mb-10`}>
          <h3 className={`text text_type_main-medium mb-3`}>{order?.name}</h3>
          <span className={`${s.status} mb-15`}>
            {order?.status === 'created' ? (
              <span className={`${s.canceled} text text_type_main-small`}>
                создан
              </span>
            ) : order?.status === 'done' ? (
              <span className={`${s.done} text text_type_main-small`}>
                Выполнен
              </span>
            ) : order?.status === 'pending' ? (
              <span className={`${s.preparing} text text_type_main-small`}>
                Готовится
              </span>
            ) : null}
          </span>
          <div className={`${s.structure}`}>
            <h3 className='text text_type_main-medium mb-6'>Состав:</h3>
            <ul className={`${s.list}`}>
              {
                order?.ingredients.map(item => {
                    return (
                        <li className={`${s.item}`}>
                            <div className = {s.img}>
                                <img src={filterToIngredients(ingredients, item, 'image')} alt=""/>
                            </div>
                            <span>{filterToIngredients(ingredients, item, 'name')}</span>
                            <span className={s.price}> 1 x {filterToIngredients(ingredients, item, 'price')} <CurrencyIcon type="primary"/> </span>
                        </li>
                    )
                })
              }
            </ul>
          </div>
        </div>
        <div className={`${s.footer}`}>
          <span className='text text_type_main-default text_color_inactive'>
            Вчера, 13:50 i - GMT+3
          </span>
          <span className={`${s.total}`}>{calcTotal(order?.ingredients, ingredients)} <CurrencyIcon type={"primary"}/></span>
        </div>
      </div>
    </div>
  )
}
OrderItem.propType = {
  id: PropTypes.number
}
export default OrderItem
