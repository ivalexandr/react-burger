import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import s from './style.module.css'

const BurgerConstructor = ({ data, bun, handleClickButton }) => {
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
        {data.map((item, index) => {
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
          <output className='mr-1'>300</output>
          <CurrencyIcon />
        </span>
        <div onClick={handleClickButton}>
          <Button type='primary' size='medium'>
            Оформить заказ
          </Button>
        </div>
      </div>
    </section>
  )
}
BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  bun: PropTypes.object,
  handleClickButton: PropTypes.func.isRequired
}
export default BurgerConstructor
