import BurgerIngredientsItem from '../BurgerIngredientsItem/BurgerIngredientsItem'
import PropTypes from 'prop-types'
import s from './style.module.css'
const BurgerIngredientsCategory = ({refCategory, type, items }) => {
  return (
    <div ref = {refCategory}>
      <h3>{type}</h3>
      <ul className={s.list}>
        {
          items.map(item => {
            return (
              <BurgerIngredientsItem
                key = {item['_id']}
                srcImage={item.image}
                price={item.price}
                name={item.name}
                item = {item}
                id = {item._id}
              />
            )
          })
        }
      </ul>
    </div>
  )
}
BurgerIngredientsCategory.propTypes = {
  type:PropTypes.string.isRequired,
  items:PropTypes.arrayOf(PropTypes.object).isRequired,
  refCategory:PropTypes.func
}
export default BurgerIngredientsCategory
