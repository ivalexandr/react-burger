import React, { ReactElement } from 'react'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import Modal from '../Modal/Modal'
import img from '../../images/success.gif'
import s from './style.module.css'
import { showOrderModal, removeOrder } from '../../redux/modal/modalSlice'
import Preloader from '../Preloader/Preloader'
import { cleanConstructor } from '../../redux/constructor/constructorSlice'

const OrderDetails: React.FC = () => {
  const dispatch = useAppDispatch()
  const order = useAppSelector(store => store.MODAL.order)
  const status = useAppSelector(store => store.MODAL.status)
  const close = () => {
    dispatch(cleanConstructor())
    dispatch(removeOrder())
    dispatch(showOrderModal(false))
  }
  const render = (): ReactElement => {
    if (status === 'loading') return <Preloader />
    if (status === 'success')
      return (
        <div className={s.wrapper}>
          <h2 className={`${s.title} mt-2`}> {order}</h2>
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
      )
    if (status === 'failed') return <h2>Ошибка подключения</h2>
    return <Preloader />
  }
  return <Modal closedFunction={close}>{render()}</Modal>
}

export default OrderDetails
