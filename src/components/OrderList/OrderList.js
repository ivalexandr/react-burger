import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getIngredients } from '../../redux/actions'
import FeedItem from '../FeedItem/FeedItem'
import s from './style.module.css'
const OrderList = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getIngredients())
    // eslint-disable-next-line
  }, [])
  const { data, dataIngredients } = useSelector(store => ({
    data: store.SOCKETS.data,
    dataIngredients:store.INGREDIENTS.data
  }))
  return (
    <div className={`${s.list} pr-2 pl-2`}>
      {data.length ? data.map(item => <FeedItem
        key = {item._id}
        id={item.number} 
        ingredientsId = {item.ingredients}
        ingredients = {dataIngredients}
        name = {item.name}
        status = {item.status}
    />) : null}
    </div>
  )
}
export default OrderList
