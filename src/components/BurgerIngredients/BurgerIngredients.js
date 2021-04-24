import  { useState } from 'react'
import PropTypes from 'prop-types'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredientsCategory from '../BurgerIngredientsCategory/BurgerIngredientsCategory'
import s from './style.module.css'

const BurgerIngredients = ({ data, handleClickIngredients }) => {
  const [current, setCurrent] = useState('Булки')
  const sauces = data.filter(item => item.type === 'sauce')
  const mains = data.filter(item => item.type === 'main')
  const buns = data.filter(item => item.type === 'bun')
  const handleClick = (item) => {
    handleClickIngredients && handleClickIngredients(item)
  }
  return (
    <section className={`mr-5 ${s.item}`}>
      <div style={{ display: 'flex' }}>
        <Tab value='Булки' active={current === 'Булки'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value='Соусы' active={current === 'Соусы'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value='Начинки' active={current === 'Начинки'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className = {`${s.categories} mt-5`}>
      {buns.length ? <BurgerIngredientsCategory handleClickCategory = {handleClick} type='Булки' items = {buns}/> : null}
      {sauces.length ? <BurgerIngredientsCategory handleClickCategory = {handleClick} type='Coусы' items = {sauces}/> : null}
      {mains.length ? <BurgerIngredientsCategory handleClickCategory = {handleClick} type='Начинки' items = {mains}/> : null}
      </div>
    </section>
  )
}
BurgerIngredients.propTypes = {
  data:PropTypes.arrayOf(PropTypes.object).isRequired,
  handleClickIngredients:PropTypes.func.isRequired,
}
export default BurgerIngredients
