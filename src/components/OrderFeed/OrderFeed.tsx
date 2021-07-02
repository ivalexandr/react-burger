import React from 'react'
import { useAppSelector } from '../../redux/hooks'
import { TObjectOrder } from '../../types'
import OrderList from '../OrderList/OrderList'
import s from './style.module.css'

const OrderFeed: React.FC = () => {
  const { total, totalToday, data } = useAppSelector(store => ({
    total: store.SOCKETS.total,
    totalToday: store.SOCKETS.totalToday,
    data: store.SOCKETS.data
  }))
  return (
    <div className={`container ${s.wrapper}`}>
      <h2 className='mb-5 mt-5 text text_type_main-large'>Лента заказов</h2>
      <div className={s.container}>
        <OrderList />
        <div className={s.statistic}>
          <div className={`${s.header} mb-15`}>
            <div className={`${s.done} mr-9`}>
              <h3 className='text text_type_main-medium mb-6'>Готовы:</h3>
              <ul className={s.list}>
                {data.map((item: TObjectOrder) => {
                  if (item.status === 'done')
                    return (
                      <li
                        key={item._id}
                        className='text text_type_digits-default mb-2'>
                        {item.number}
                      </li>
                    )
                  return null
                })}
              </ul>
            </div>
            <div className={`${s.inWork}`}>
              <h3 className='text text_type_main-medium mb-6'>В работе:</h3>
              <ul className={s.list}>
                {data.map((item: TObjectOrder) => {
                  if (item.status === 'pending')
                    return (
                      <li
                        key={item._id}
                        className='text text_type_digits-default mb-2'>
                        {item.number}
                      </li>
                    )
                  return null
                })}
              </ul>
            </div>
          </div>
          <div className={`mb-15`}>
            <h3 className='text text_type_main-medium'>
              Выполнено за всё время:
            </h3>
            <div className={`${s.allDone} text text_type_digits-large`}>
              {total}
            </div>
          </div>
          <div>
            <h3 className='text text_type_main-medium'>
              Выполнено за сегодня:
            </h3>
            <div className={`${s.allDay} text text_type_digits-large`}>
              {totalToday}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default OrderFeed
