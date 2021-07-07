import React, { useEffect } from 'react'
import Modal from '../Modal/Modal'
import { useParams } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { getIngredientsNoModal } from '../../redux/actions'
import Preloader from '../Preloader/Preloader'
import cn from 'classnames'
import s from './style.module.css'

interface IPropsIngredientsDetails {
  type?: string
}

const IngredientsDetails: React.FC<IPropsIngredientsDetails> = ({ type }) => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getIngredientsNoModal(id))
    // eslint-disable-next-line
  }, [])
  const { item, status } = useAppSelector(store => ({
    item: store.INGREDIENTS.ingredient,
    status: store.INGREDIENTS.status
  }))
  
  const render = () => {
    if (status === 'loading') return <Preloader />
    if (type === 'modal')
      return (
        <Modal title='Детали ингредиента'>
          <div className={s.wrapper}>
            <div className={s.image}>
              <img src={item!.image_large} alt={item!.name} />
            </div>
            <h3 className={`${s.name} text text_type_main-medium`}>{item!.name}</h3>
            <p className={`${s.descr} mt-4 text text_type_main-default`}>
              API не возвращает описание ингредиента
            </p>
            <div className={`${s.food} text text_type_main-default`}>
              <div className={s.item}>
                <span>Калории,ккал</span>
                <span
                  className={`${s.number} text text_type_digits-default mt-1`}>
                  {item!.calories}
                </span>
              </div>
              <div className={s.item}>
                <span>Белки, г</span>
                <span
                  className={`${s.number} text text_type_digits-default mt-1`}>
                  {item!.proteins}
                </span>
              </div>
              <div className={s.item}>
                <span>Жиры, г</span>
                <span
                  className={`${s.number} text text_type_digits-default mt-1`}>
                  {item!.fat}
                </span>
              </div>
              <div className={s.item}>
                <span>Углеводы, г</span>
                <span
                  className={`${s.number} text text_type_digits-default mt-1`}>
                  {item!.carbohydrates}
                </span>
              </div>
            </div>
          </div>
        </Modal>
      )
    return (
      <div className={cn(s.wrapper, s.nomodal)}>
        <div className={s.image}>
          <img src={item!.image_large} alt={item!.name} />
        </div>
        <h3 className={`${s.name} text text_type_main-medium`}>{item!.name}</h3>
        <p className={`${s.descr} mt-4 text text_type_main-default`}>
          API не возвращает описание ингредиента
        </p>
        <div className={`${s.food} text text_type_main-default`}>
          <div className={s.item}>
            <span>Калории,ккал</span>
            <span className={`${s.number} text text_type_digits-default mt-1`}>
              {item!.calories}
            </span>
          </div>
          <div className={s.item}>
            <span>Белки, г</span>
            <span className={`${s.number} text text_type_digits-default mt-1`}>
              {item!.proteins}
            </span>
          </div>
          <div className={s.item}>
            <span>Жиры, г</span>
            <span className={`${s.number} text text_type_digits-default mt-1`}>
              {item!.fat}
            </span>
          </div>
          <div className={s.item}>
            <span>Углеводы, г</span>
            <span className={`${s.number} text text_type_digits-default mt-1`}>
              {item!.carbohydrates}
            </span>
          </div>
        </div>
      </div>
    )
  }
  return render()
}
export default IngredientsDetails
