import React, { useState, useRef, useEffect } from 'react'
import { useAppSelector } from '../../redux/hooks'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredientsCategory from '../BurgerIngredientsCategory/BurgerIngredientsCategory'
import { useTabs } from '../../services/myHooks/useTabs'
import { TObjectIngredient } from '../../types'
import s from './style.module.css'



const BurgerIngredients:React.FC = () => {

  const ingredients = useAppSelector(store => store.INGREDIENTS.data)

  const [current, setCurrent] = useState<string>('')
  const sauces = ingredients.filter((item:TObjectIngredient) => item.type === 'sauce')
  const mains = ingredients.filter((item:TObjectIngredient) => item.type === 'main')
  const buns = ingredients.filter((item:TObjectIngredient) => item.type === 'bun')
  const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
    setCurrent('Булки')
    // eslint-disable-next-line
    }, [])

  const [bunsRef, getBuns] = useTabs(containerRef.current, setCurrent)
  const [saucesRef, getSauces] = useTabs(containerRef.current, setCurrent)
  const [mainsRef, getMains] = useTabs(containerRef.current, setCurrent)

  const handleScroll:React.UIEventHandler<HTMLDivElement> = ():void => {
    getBuns()
    getSauces()
    getMains()
  }
  
  return (
    <section className={`mr-5 ${s.item}`} data-cy="source">
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
export default BurgerIngredients
