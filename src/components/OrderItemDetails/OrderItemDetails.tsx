import React, { ReactElement, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { useParams } from 'react-router'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { getOrderItem } from '../../redux/actions'
import { TObjectIngredient } from '../../types'
import Preloader from '../Preloader/Preloader'
import cn from 'classnames'
import s from './style.module.css'

interface IPropsOrderItem {
  isModal?: boolean
}

const OrderItemDetails: React.FC<IPropsOrderItem> = ({ isModal }) => {
  const dispatch = useAppDispatch()
  const { id } = useParams<{ id: string }>()
  const { ingredients, status, order, getStatusIngredients } = useAppSelector(
    store => ({
      ingredients: store.INGREDIENTS.data,
      status: store.SOCKETS.statusGetOrder,
      getStatusIngredients: store.INGREDIENTS.status,
      order: store.SOCKETS.order
    })
  )

  useEffect(() => {
    dispatch(getOrderItem(id))
    // eslint-disable-next-line
  }, [])

  const calcTotal = (
    ingredientsId: Array<string>,
    ingredients: Array<TObjectIngredient>
  ): number => {
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

  const filterToIngredients = (
    ingredients: Array<TObjectIngredient>,
    id: string,
    type: 'image' | 'name' | 'price'
  ): string => {
    const ingredient =
      ingredients && ingredients.filter(item => item._id === id)[0][type]
    return ingredient.toString()
  }

  const nowDate: Date = new Date()

  const dataString: string = `${nowDate.getFullYear()}-${
    nowDate.getMonth() + 1 < 10
      ? `0${nowDate.getMonth() + 1}`
      : nowDate.getMonth() + 1
  }-${nowDate.getDate() < 10 ? `0${nowDate.getDate()}` : nowDate.getDate()}`
  let dateOrder: string
  let timeOrder: string
  if(status === 'success'){
    dateOrder = order!.createdAt?.slice(0, 10)
    timeOrder = order!.createdAt?.slice(11, 19)
  }
  

  const renderDate = (): string => {
    if (dataString === dateOrder) return `??????????????, ${timeOrder} i-GMT+3`
    return `${dateOrder} ${timeOrder} i-GMT+3`
  }
  const render = (): ReactElement => {
    if (status === 'loading' && getStatusIngredients === 'loading')
      return <Preloader />
    if (status === 'success' && getStatusIngredients === 'success' && order)
      return (
        <div className={cn(s.wrapper, {[s.nomodal]: !isModal})}>
          <div className={s.info}>
            <div className={`${s.header} text text_type_digits-default mb-10`}>
              #{id}
            </div>
            <div className={`mb-10`}>
              <h3 className={`text text_type_main-medium mb-3`}>
                {
                  order!.name
                }
              </h3>
              <span className={`${s.status} mb-15`}>
                {
                  order!.status === 'created' ? (
                    <span className={`${s.canceled} text text_type_main-small`}>
                      ????????????
                    </span>
                  ) :
                  order!.status === 'done' ? (
                    <span className={`${s.done} text text_type_main-small`}>
                      ????????????????
                    </span>
                  ) : 
                  order!.status === 'pending' ? (
                    <span
                      className={`${s.preparing} text text_type_main-small`}>
                      ??????????????????
                    </span>
                  ) : null
                }
              </span>
              <div className={`${s.structure}`}>
                <h3 className='text text_type_main-medium mb-6'>????????????:</h3>
                <ul className={`${s.list}`}>
                  {
                    order!.ingredients.map((item: string, id: number) => {
                      return (
                        <li className={`${s.item}`} key={id}>
                          <div className={s.img}>
                            <img
                              src={filterToIngredients(
                                ingredients,
                                item,
                                'image'
                              )}
                              alt=''
                            />
                          </div>
                          <span>
                            {filterToIngredients(ingredients, item, 'name')}
                          </span>
                          <span className={s.price}>
                            {' '}
                            1 x{' '}
                            {filterToIngredients(
                              ingredients,
                              item,
                              'price'
                            )}{' '}
                            <CurrencyIcon type='primary' />{' '}
                          </span>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>
            <div className={`${s.footer}`}>
              <span className='text text_type_main-default text_color_inactive'>
                {renderDate()}
              </span>
              <span className={`${s.total}`}>
                {calcTotal(
                  order!.ingredients,
                  ingredients
                )}{' '}
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

export default OrderItemDetails
