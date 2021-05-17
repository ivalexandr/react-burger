import { useSelector } from 'react-redux'
import Modal from '../Modal/Modal'
import PropTypes from 'prop-types'
import img from '../../images/success.gif'
import s from './style.module.css'

const OrderDetails = ({ handleClickOrder }) => {
  const handleClick = target => {
    handleClickOrder && handleClickOrder(target)
  }
  const order  = useSelector(store => store.burgerConstructor.order)
  
  return (
    <Modal handleClickModal={handleClick}>
      <div className={s.wrapper}>
        <h2 className={`${s.title} mt-2`}> { order }</h2>
        <span className={`${s.subtitle} text text_type_main-medium mt-4`}>
          идентификатор заказа
        </span>
        <div className={`${s.image}`}>
          <img src={img} alt='success'></img>
        </div>
        <div className={`${s.bottom}`}>
          <span className='text text_type_main-default'>
            Ваш заказ начали готовить
          </span>
          <span className={`${s.dark} text text_type_main-default mt-1`}>
            Дождитесь готовности на орбитальной станции
          </span>
        </div>
      </div>
    </Modal>
  )
}
OrderDetails.propType = {
  orderNumber: PropTypes.string.isRequired,
  handleClickOrder:PropTypes.func.isRequired,
}
export default OrderDetails
