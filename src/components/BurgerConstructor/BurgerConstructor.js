import { useSelector, useDispatch } from 'react-redux'
import {
  Button,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { useDrop } from 'react-dnd'
import { PUSH__ITEM, SET__BUN, SET__BUNS, SET__INGREDIENT, PUSH__ITEM__DATA, SET__BUNS__DATA__CONSTRUCTOR } from '../../redux/types'
import cn from 'classnames'
import BurgerConstructorItem from '../BurgerConstructorItem/BurgerConstructorItem'
import s from './style.module.css'


const BurgerConstructor = ({ handleClickButton }) => {
  const {bun, totalCost, dataConstructor, ingredients } = useSelector(store => ({
    bun:store.burgerConstructor.bun,
    totalCost:store.totalCost.total,
    dataConstructor:store.burgerConstructor.data,
    ingredients:store.dataIngredients.ingredients
  }))
  const dispatch = useDispatch()
  const onDropHandler = (itemId) => {
    const [item] =  ingredients.filter(item => item._id === itemId.ingredient._id)
    console.log(itemId)
    dispatch({type:SET__INGREDIENT, payload:item})
    if(item.type === 'bun'){
      dispatch({type:SET__BUN, payload:item})
      dispatch({type:SET__BUNS, payload:item})
      dispatch({type:SET__BUNS__DATA__CONSTRUCTOR, payload:item})
    }else{
      dispatch({type:PUSH__ITEM, payload:item})
      dispatch({ type: PUSH__ITEM__DATA, payload: item })
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
    if (!totalCost.length) {
      return 0
    }
    accumulator = totalCost.reduce(
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
                id = {index}
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
    </section>
  )
}
BurgerConstructor.propTypes = {
  bun: PropTypes.object,
  handleClickButton: PropTypes.func.isRequired
}
export default BurgerConstructor
