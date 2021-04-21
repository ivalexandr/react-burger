import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import s from './style.module.css'

const BurgerConstructor = ({ data, bun }) => {
  return (
    <section className={`${s.item}`}>
      <div className={`${s.constructor__item} mb-1`}>
        <div className={s.icon}></div>
        <ConstructorElement
          type='top'
          isLocked='true'
          text={bun.name}
          thumbnail={bun.image_mobile}
          price={bun.price}
        />
      </div>
      <div className={s.constructor}>
        {data.map((item, index) => {
          return (
            <div className={`${s.constructor__item} mb-1`} key={index}>
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
        })}
      </div>
      <div className={`${s.constructor__item} mb-1`}>
        <div className={s.icon}></div>
        <ConstructorElement
          type='bottom'
          isLocked='true'
          text={bun.name}
          thumbnail={bun.image_mobile}
          price={bun.price}
        />
      </div>
      <div className={`${s.total} mt-5`}>
          <span className = {`${s.total__price} text mr-5`}>
          <output className = "mr-1">5336</output>
          <CurrencyIcon />
          </span>
        <Button type='primary' size='medium'>
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}
BurgerConstructor.propTypes = {
  data:PropTypes.arrayOf(PropTypes.object),
  bun:PropTypes.object
}
export default BurgerConstructor
