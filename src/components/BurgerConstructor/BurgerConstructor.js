import { useSelector, useDispatch } from 'react-redux'
import {
  Button,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrop } from 'react-dnd'
import cn from 'classnames'
import BurgerConstructorItem from '../BurgerConstructorItem/BurgerConstructorItem'
import { setIngredient, showOrderModal } from '../../redux/modal/modalSlice'
import { pushItem, setBun, setBuns, checkBunEmpty } from '../../redux/constructor/constructorSlice'
import {getOrderNumber} from '../../redux/actions'
import { useHistory } from 'react-router-dom'
import s from './style.module.css'



const BurgerConstructor = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const {bun, dataConstructor, ingredients, isBunEmpty, user } = useSelector(store => ({
    bun:store.CONSTRUCTOR.bun,
    dataConstructor:store.CONSTRUCTOR.data,
    ingredients:store.INGREDIENTS.data,
    isBunEmpty:store.CONSTRUCTOR.isBunEmpty,
    user:store.AUTH?.user
  }))
  const onDropHandler = (itemId) => {
    const [item] =  ingredients.filter(item => item._id === itemId.ingredient._id)
    dispatch(setIngredient(item))
    if(item.type === 'bun'){
      dispatch(setBun(item))
      dispatch(setBuns(item))
      dispatch(checkBunEmpty(false))
    }else{
      dispatch(pushItem(item))
    }
  }
  const [{isHover}, dropTarget] = useDrop({
    accept:'ingredient',
    drop(itemId){
      onDropHandler(itemId)
    },
    collect:monitor => ({
        isHover:monitor.isOver()
    }),
  })
  const calcTotalCost = () => {
    let accumulator = 0
    if (!dataConstructor.length) {
      return 0
    }
    accumulator = dataConstructor.reduce(
      (acc, item) => {
        if (item.type === 'bun') {
          return +acc + +item.price * 2
        }
        return +acc + +item.price
      },
      [0]
    )
    return accumulator
  }
  const handleClickButton = () => {
    if (!dataConstructor.length) return
    if(!bun){dispatch(checkBunEmpty(true)); return} 
    if(!user) {history.replace({pathname:'/login'}); return}
    dispatch(checkBunEmpty(false))
    dispatch(getOrderNumber(dataConstructor))
    dispatch(showOrderModal(true))
  }

  return (
    <section className={cn(s.section, {[s.active]:isHover})} ref = {dropTarget}>
      {bun ? (
        <BurgerConstructorItem 
            type='top'
            isLocked='true'
            name={bun.name}
            image={bun.image_mobile}
            price={bun.price}
            ingredient = {bun.type}
        />
      ) : null}
      <div className={`${s.constructor} mb-1 mt-1`} >
        {dataConstructor.map((item, index) => {
          if (item.type !== 'bun') {
            return (
              <BurgerConstructorItem 
                key = {index}
                index = {index}
                name = {item.name}
                image = {item.image_mobile}
                price = {item.price}
                item = {item}
              />
            )
          }
          return null
        })}
      </div>
      {bun ? (
        <BurgerConstructorItem 
            type='bottom'
            isLocked='true'
            name={bun.name}
            image={bun.image_mobile}
            price={bun.price}
            ingredient = {bun.type}
        />
      ) : null}
      <div className={`${s.total} mt-5`}>
        <span className={`${s.price} text mr-5`}>
          <output className='mr-1'>{calcTotalCost()}</output>
          <CurrencyIcon />
        </span>
        <Button type='primary' size='medium' onClick={handleClickButton}>
          Оформить заказ
        </Button>
      </div>
      {isBunEmpty && <div className = {s.message}>Необходимо выбрать булку!</div>}
    </section>
  )
}

export default BurgerConstructor
