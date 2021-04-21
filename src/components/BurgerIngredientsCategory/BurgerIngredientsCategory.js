import BurgerIngredientsItem from '../BurgerIngredientsItem/BurgerIngredientsItem'
import PropTypes from 'prop-types'
import s from './style.module.css'
const BurgerIngredientsCategory = ({ type, items }) => {
  return (
    <>
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
            />
          )
        })
      }
      </ul>
    </>
  )
}
BurgerIngredientsCategory.propTypes = {
  type:PropTypes.string,
  items:PropTypes.arrayOf(PropTypes.object).isRequired
}
export default BurgerIngredientsCategory
