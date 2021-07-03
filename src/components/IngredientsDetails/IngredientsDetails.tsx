import React, { useEffect } from 'react'
import Modal from '../Modal/Modal'
import { useParams } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { getIngredientsNoModal } from '../../redux/actions'
import Preloader from '../Preloader/Preloader'
import s from './style.module.css'

const IngredientsDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  useEffect(() => {
    // @ts-ignore: Unreachable code error
    dispatch(getIngredientsNoModal(id))
    // eslint-disable-next-line
  }, [])
  const { item, status } = useAppSelector(store => ({
    item: store.INGREDIENTS.ingredient,
    status: store.INGREDIENTS.status,
  }))
   // @ts-ignore: Unreachable code error
  const { image_large, name, calories, proteins, fat, carbohydrates } = item

  const render = () => {
    if (status === 'loading') return <Preloader/>
    return (
      <Modal title='Детали ингредиента' >
        <div className={s.wrapper}>
          <div className={s.image}>
            <img src={image_large} alt={name} />
          </div>
          <h3 className={`${s.name} text text_type_main-medium`}>{name}</h3>
          <p className={`${s.descr} mt-4 text text_type_main-default`}>
            API не возвращает описание ингредиента
          </p>
          <div className={`${s.food} text text_type_main-default`}>
            <div className={s.item}>
              <span>Калории,ккал</span>
              <span
                className={`${s.number} text text_type_digits-default mt-1`}>
                {calories}
              </span>
            </div>
            <div className={s.item}>
              <span>Белки, г</span>
              <span
                className={`${s.number} text text_type_digits-default mt-1`}>
                {proteins}
              </span>
            </div>
            <div className={s.item}>
              <span>Жиры, г</span>
              <span
                className={`${s.number} text text_type_digits-default mt-1`}>
                {fat}
              </span>
            </div>
            <div className={s.item}>
              <span>Углеводы, г</span>
              <span
                className={`${s.number} text text_type_digits-default mt-1`}>
                {carbohydrates}
              </span>
            </div>
          </div>
        </div>
      </Modal>
    )
  }
  return render()
}
export default IngredientsDetails
