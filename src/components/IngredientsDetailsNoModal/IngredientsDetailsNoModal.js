import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getIngredientsNoModal } from '../../redux/actions'
import Preloader from '../Preloader/Preloader'
import s from './style.module.css'

const IngredientsDetailsNoModal = () => {
  const dispatch = useDispatch()

  const { id } = useParams()

  useEffect(() => {
    dispatch(getIngredientsNoModal(id))
    // eslint-disable-next-line
  }, [])
  const { item, status } = useSelector(store => ({
    item: store.INGREDIENTS.ingredient,
    status: store.INGREDIENTS.status
  }))
  const render = () => {
    if (status === 'loading') return <Preloader />
    return (
      <div className={s.wrapper}>
        <div className={s.image}>
          <img src={item.image_large} alt={item.name} />
        </div>
        <h3 className={`${s.name} text text_type_main-medium`}>{item.name}</h3>
        <p className={`${s.descr} mt-4 text text_type_main-default`}>
          API не возвращает описание ингредиента
        </p>
        <div className={`${s.food} text text_type_main-default`}>
          <div className={s.item}>
            <span>Калории,ккал</span>
            <span className={`${s.number} text text_type_digits-default mt-1`}>
              {item.calories}
            </span>
          </div>
          <div className={s.item}>
            <span>Белки, г</span>
            <span className={`${s.number} text text_type_digits-default mt-1`}>
              {item.proteins}
            </span>
          </div>
          <div className={s.item}>
            <span>Жиры, г</span>
            <span className={`${s.number} text text_type_digits-default mt-1`}>
              {item.fat}
            </span>
          </div>
          <div className={s.item}>
            <span>Углеводы, г</span>
            <span className={`${s.number} text text_type_digits-default mt-1`}>
              {item.carbohydrates}
            </span>
          </div>
        </div>
      </div>
    )
  }
  return render()
}

export default IngredientsDetailsNoModal
