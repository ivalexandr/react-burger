import { useContext } from 'react'
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import { TotalCostContext } from '../../Context/TotalCost/context'
import { DataConstructorContext } from '../../Context/DataConstructor/DataConstructorContext'
import PropTypes from 'prop-types'
import s from './style.module.css'

const BurgerConstructor = ({ bun, handleClickButton }) => {
  const { totalCost } = useContext(TotalCostContext)
  const { data } = useContext(DataConstructorContext)
  const calcTotalCost = () => {
    let accumulator = 0
    if (!totalCost.total.length) {
      return 0
    }
    accumulator = totalCost.total.reduce(
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
    <section className={`${s.section}`}>
      {bun ? (
        <div className={`${s.item}`}>
          <div className={s.icon}></div>
          <ConstructorElement
            type='top'
            isLocked='true'
            text={bun.name}
            thumbnail={bun.image_mobile}
            price={bun.price}
          />
        </div>
      ) : null}
      <div className={`${s.constructor} mb-1 mt-1`}>
        {data['data'].map((item, index) => {
          if (item.type !== 'bun') {
            return (
              <div className={`${s.item}`} key={index}>
                <div className={s.icon}>
                  <DragIcon />
                </div>
                <ConstructorElement
                  text={item.name}
                  thumbnail={item.image_mobile}
                  price={item.price}
                />
              </div>
            )
          }
          return null
        })}
      </div>
      {bun ? (
        <div className={`${s.item} mb-1`}>
          <div className={s.icon}></div>
          <ConstructorElement
            type='bottom'
            isLocked='true'
            text={bun.name}
            thumbnail={bun.image_mobile}
            price={bun.price}
          />
        </div>
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
