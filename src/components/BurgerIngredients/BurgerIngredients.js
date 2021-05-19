import  { useState } from 'react'
import PropTypes from 'prop-types'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredientsCategory from '../BurgerIngredientsCategory/BurgerIngredientsCategory'
import { useInView } from 'react-intersection-observer'
import s from './style.module.css'

const BurgerIngredients = ({ data }) => {
  const [current, setCurrent] = useState('Булки')
  const sauces = data.filter(item => item.type === 'sauce')
  const mains = data.filter(item => item.type === 'main')
  const buns = data.filter(item => item.type === 'bun')

  const [bunsRef, inViewBuns] = useInView({threshold:0.3})
  const [saucesRef, inViewSauces] = useInView({threshold:1})
  const [mainsRef, inViewMain] = useInView({threshold:0.4})

  const handleScroll = () => {
    inViewBuns && setCurrent('Булки')
    inViewSauces && setCurrent('Соусы')
    inViewMain && setCurrent('Начинки')
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
      <div className = {`${s.categories} mt-5`} onScroll = {handleScroll}>
      {buns.length ? <BurgerIngredientsCategory refCategory = {bunsRef} type='Булки' items = {buns}/> : null}
      {sauces.length ? <BurgerIngredientsCategory refCategory = {saucesRef} type='Coусы' items = {sauces}/> : null}
      {mains.length ? <BurgerIngredientsCategory refCategory = {mainsRef} type='Начинки' items = {mains}/> : null}
      </div>
    </section>
  )
}
BurgerIngredients.propTypes = {
  data:PropTypes.arrayOf(PropTypes.object).isRequired,
}
export default BurgerIngredients
