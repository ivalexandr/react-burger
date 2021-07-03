import React from 'react'
import { useAppSelector } from '../../redux/hooks'
import Modal from '../Modal/Modal'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useParams } from 'react-router-dom'
import s from './style.module.css'
import { TObjectIngredient, TObjectOrder } from '../../types'

const FeedItemModal:React.FC = () => {
  const data = useAppSelector(store => store.SOCKETS.data)
  const ingredients = useAppSelector(store => store.INGREDIENTS.data)

  const { id } = useParams<{ id:string }>()

  const order:TObjectOrder = data.filter((item:TObjectOrder ) => item.number === +id)[0]

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
    return ingredients.filter(item => item._id === id)[0][type].toString()
  }

  const nowDate: Date = new Date()
  const dataString: string = `${nowDate.getFullYear()}-${nowDate.getDay() + 1 < 10 ? `0${nowDate.getDay() + 1}` : nowDate.getDay() + 1}-${nowDate.getDate() < 10 ? `0${nowDate.getDate()}` : nowDate.getDate()}`
  const dateOrder: string | undefined = order.createdAt?.slice(0,10)
  const timeOrder: string | undefined = order.createdAt?.slice(11, 19)

  const renderDate = (): string => {
    if(dataString === dateOrder) return `Сегодня, ${timeOrder} i-GMT+3`
    return `${dateOrder} i-GMT+3`
  }

  return (
    <Modal>
      <div className={s.wrapper}>
        <div className={s.info}>
          <div className={`${s.header} text text_type_digits-default mb-10`}>
            #{id}
          </div>
          <div className={`mb-10`}>
            <h3 className={`text text_type_main-medium mb-3`}>{
            // @ts-ignore: Unreachable code error
            order.name
            }</h3>
            {
              // @ts-ignore: Unreachable code error
            order.status === 'created' ? (
              <span className={`${s.canceled} text text_type_main-small`}>
                создан
              </span>
            ) : 
            // @ts-ignore: Unreachable code error
            order.status === 'done' ? (
              <span className={`${s.done} text text_type_main-small`}>
                Выполнен
              </span>
            ) : 
            // @ts-ignore: Unreachable code error
            order.status === 'pending' ? (
              <span className={`${s.preparing} text text_type_main-small`}>
                Готовится
              </span>
            ) : null}
            <div className={`${s.structure}`}>
              <h3 className='text text_type_main-medium mb-6'>Состав:</h3>
              <ul className={`${s.list}`}>
                {// @ts-ignore: Unreachable code error
                order.ingredients.map((item: string, id: number) => {
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
                        1 x {filterToIngredients(
                          ingredients,
                          item,
                          'price'
                        )}{' '}
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
                order.ingredients,
                ingredients)}{' '}
              <CurrencyIcon type={'primary'} />
            </span>
          </div>
        </div>
      </div>
    </Modal>
  )
}
export default FeedItemModal
