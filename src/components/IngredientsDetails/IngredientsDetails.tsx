import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import Preloader from '../Preloader/Preloader'
import cn from 'classnames'
import s from './style.module.css'
import { getIngredient } from '../../redux/ingredients/ingredientsSlice'

interface IPropsIngredientsDetails {
  isModal?: boolean
}

const IngredientsDetails: React.FC<IPropsIngredientsDetails> = ({ isModal }) => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
 
  const { item, status } = useAppSelector(store => ({
    item: store.INGREDIENTS.ingredient,
    status: store.INGREDIENTS.status
  }))
  useEffect(() => {
    dispatch(getIngredient(id))
    // eslint-disable-next-line
  }, [status])
  const render = () => {
    if (status === 'loading') return <Preloader />
    if (status === 'success' && item) return (
          <div className={cn(s.wrapper, {[s.nomodal]: !isModal})}>
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
      )
      return null
  }
  return render()
}
export default IngredientsDetails
