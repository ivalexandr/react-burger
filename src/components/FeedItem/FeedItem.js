import { useRouteMatch, Link, useLocation } from 'react-router-dom'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import s from './style.module.css'

const FeedItem = ({ id, status, ingredientsId, ingredients, name }) => {
  const { path } = useRouteMatch()
  const location = useLocation()

  const ingredientsImages = ingredientsId.map(item => {
    return ingredients.filter(ingredient => ingredient._id === item)[0].image
  })

  const calcTotal = (ingredientsId, ingredients) => {
    const total =
      ingredientsId &&
      ingredientsId.reduce(
        (acc, item) => {
          if (
            ingredients.filter(ingredient => ingredient._id === item)[0]
              .type === 'bun'
          )
            return (
              +acc +
              ingredients.filter(ingredient => ingredient._id === item)[0]
                .price *
                2
            )
          return (
            +acc +
            +ingredients.filter(ingredient => ingredient._id === item)[0].price
          )
        },
        [0]
      )
    return total
  }
  return (
    <Link
      to={{ pathname: `${path}/${id}`, state: { background: location } }}
      className={`${s.wrapper} p-6 mt-4`}>
      <div className={`${s.header} mb-6`}>
        <span className='text text_type_digits-default'>#{id}</span>
        <span className='text text_type_main-default text_color_inactive'>
          Сегодня, 16:20 i-GMT+3
        </span>
      </div>
      <div className={`${s.body} mb-6`}>{name}</div>
      {status === 'created' ? (
        <span className={`${s.canceled} text text_type_main-small`}>
          создан
        </span>
      ) : status === 'done' ? (
        <span className={`${s.done} text text_type_main-small`}>Выполнен</span>
      ) : status === 'pending' ? (
        <span className={`${s.preparing} text text_type_main-small`}>
          Готовится
        </span>
      ) : null}
      <div className={`${s.footer} mt-6`}>
        <div className={s.images}>
          {ingredientsImages.map((item, id) => {
            if (id < 5) {
              return (
                <div key={id} className={s.round}>
                  {' '}
                  <img src={item} alt=''></img>{' '}
                </div>
              )
            }
            return null
          })}
          {ingredientsImages.length > 5 ? (
            <div className={s.round_more}>
              <img src={ingredientsImages[5]} alt='' />
              <span className='text text_type_digits-default'>
                +{ingredientsImages.length - 5}
              </span>
            </div>
          ) : null}
        </div>
        <span className={`${s.price} text text_type_digits-default`}>
          {calcTotal(ingredientsId, ingredients)}
          <CurrencyIcon type='primary' />
        </span>
      </div>
    </Link>
  )
}

export default FeedItem
