import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getIngredients } from '../../redux/actions'
import FeedItem from '../FeedItem/FeedItem'
import s from './style.module.css'
import { TObjectOrder } from '../../types'

const OrderList: React.FC = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getIngredients())
    // eslint-disable-next-line
  }, [])
  const { data, dataIngredients } = useAppSelector(store => ({
    data: store.SOCKETS.data,
    dataIngredients: store.INGREDIENTS.data
  }))
  return (
    <div className={`${s.list} pr-2 pl-2`}>
      {data.length
        ? data.map((item: TObjectOrder) => (
            <FeedItem
              key={item._id}
              id={item.number}
              ingredientsId={item.ingredients}
              ingredients={dataIngredients}
              name={item.name}
              status={item.status}
              date={item.createdAt}
            />
          ))
        : null}
    </div>
  )
}
export default OrderList
