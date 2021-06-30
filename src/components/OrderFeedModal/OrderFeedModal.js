import { useSelector } from 'react-redux'
import Modal from '../Modal/Modal'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useParams } from 'react-router-dom'
import s from './style.module.css'

const FeedItemModal = () => {
  const data = useSelector(store => store.SOCKETS.data)
  const ingredients = useSelector(store => store.INGREDIENTS.data)

  const { id } = useParams()

  const order = data.filter(item => item.number === +id)[0]

  const calcTotal = (ingredientsId, ingredients) => {
    return ingredientsId.reduce(
      (acc, item) => {
        return (
          +acc +
          +ingredients.filter(ingredient => ingredient._id === item)[0].price
        )
      },
      [0]
    )
  }

  const filterToIngredients = (ingredients, id, type) => {
    return ingredients.filter(item => item._id === id)[0][type]
  }

  return (
    <Modal>
      <div className={s.wrapper}>
        <div className={s.info}>
          <div className={`${s.header} text text_type_digits-default mb-10`}>
            #{id}
          </div>
          <div className={`mb-10`}>
            <h3 className={`text text_type_main-medium mb-3`}>{order.name}</h3>
            {order.status === 'created' ? (
              <span className={`${s.canceled} text text_type_main-small`}>
                создан
              </span>
            ) : order.status === 'done' ? (
              <span className={`${s.done} text text_type_main-small`}>
                Выполнен
              </span>
            ) : order.status === 'pending' ? (
              <span className={`${s.preparing} text text_type_main-small`}>
                Готовится
              </span>
            ) : null}
            <div className={`${s.structure}`}>
              <h3 className='text text_type_main-medium mb-6'>Состав:</h3>
              <ul className={`${s.list}`}>
                {order.ingredients.map(item => {
                  return (
                    <li className={`${s.item}`}>
                      <div className={s.img}>
                        <img
                          src={filterToIngredients(ingredients, item, 'image')}
                          alt=''
                        />
                      </div>
                      <span>
                        {filterToIngredients(ingredients, item, 'name')}
                      </span>
                      <span className={s.price}>
                        {' '}
                        1 x {filterToIngredients(
                          ingredients,
                          item,
                          'price'
                        )}{' '}
                        <CurrencyIcon type='primary' />{' '}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div className={`${s.footer}`}>
            <span className='text text_type_main-default text_color_inactive'>
              Вчера, 13:50 i - GMT+3
            </span>
            <span className={`${s.total}`}>
              {calcTotal(order.ingredients, ingredients)}{' '}
              <CurrencyIcon type={'primary'} />
            </span>
          </div>
        </div>
      </div>
    </Modal>
  )
}
export default FeedItemModal
