import Modal from '../Modal/Modal'
import PropTypes from 'prop-types'
import s from './style.module.css'

const IngredientsDetails = ({ item, handleClickIngredients }) => {
  const { image_large, name, calories, proteins, fat, carbohydrates } = item
  const handleClick = (target) => {
    handleClickIngredients && handleClickIngredients(target)
  }
  return (
    <Modal title='Детали ингредиента' handleClickModal = {handleClick}>
      <div className={s.wrapper}>
        <div className={s.image}>
          <img src={image_large} alt={name} />
        </div>
        <h3 className={`${s.name} text text_type_main-medium`}>{name}</h3>
        <p className={`${s.descr} mt-4 text text_type_main-default`}>
          Превосходные котлеты из марсианской Магнолии для фирменных космических
          бургеров, набирающих популярность по всей вселенной.
        </p>
        <div className={`${s.food} text text_type_main-default`}>
          <div className={s.item}>
            <span>Калории,ккал</span>
            <span className={`${s.number} text text_type_digits-default mt-1`}>
              {calories}
            </span>
          </div>
          <div className={s.item}>
            <span>Белки, г</span>
            <span className={`${s.number} text text_type_digits-default mt-1`}>
              {proteins}
            </span>
          </div>
          <div className={s.item}>
            <span>Жиры, г</span>
            <span className={`${s.number} text text_type_digits-default mt-1`}>
              {fat}
            </span>
          </div>
          <div className={s.item}>
            <span>Углеводы, г</span>
            <span className={`${s.number} text text_type_digits-default mt-1`}>
              {carbohydrates}
            </span>
          </div>
        </div>
      </div>
    </Modal>
  )
}
IngredientsDetails.propTypes = {
  item: PropTypes.object.isRequired,
  handleClickIngredients:PropTypes.func.isRequired,
}
export default IngredientsDetails
