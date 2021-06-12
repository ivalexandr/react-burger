import { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredientsCategory from '../BurgerIngredientsCategory/BurgerIngredientsCategory'
import { useTabs } from '../../services/myHooks/useTabs'
import s from './style.module.css'

const BurgerIngredients = ({ data }) => {
  const [current, setCurrent] = useState('')
  const sauces = data.filter(item => item.type === 'sauce')
  const mains = data.filter(item => item.type === 'main')
  const buns = data.filter(item => item.type === 'bun')
  const containerRef = useRef()

  useEffect(() => {
    setCurrent('Булки')
  }, [])

  const [bunsRef, getBuns] = useTabs(containerRef.current, setCurrent)
  const [saucesRef, getSauces] = useTabs(containerRef.current, setCurrent)
  const [mainsRef, getMains] = useTabs(containerRef.current, setCurrent)

  const handleScroll = () => {
    getBuns()
    getSauces()
    getMains()
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
        <Tab
          value='Начинки'
          active={current === 'Начинки'}
          onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div
        className={`${s.categories} mt-5`}
        onScroll={handleScroll}
        ref={containerRef}>
        {buns.length ? (
          <BurgerIngredientsCategory
            refCategory={bunsRef}
            type='Булки'
            items={buns}
          />
        ) : null}
        {sauces.length ? (
          <BurgerIngredientsCategory
            refCategory={saucesRef}
            type='Соусы'
            items={sauces}
          />
        ) : null}
        {mains.length ? (
          <BurgerIngredientsCategory
            refCategory={mainsRef}
            type='Начинки'
            items={mains}
          />
        ) : null}
      </div>
    </section>
  )
}
BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
}
export default BurgerIngredients
