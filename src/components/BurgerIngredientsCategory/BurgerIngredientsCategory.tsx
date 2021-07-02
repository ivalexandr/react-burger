import React, { RefObject } from 'react'
import { TObjectIngredient } from '../../types'
import BurgerIngredientsItem from '../BurgerIngredientsItem/BurgerIngredientsItem'
import s from './style.module.css'

interface IPropsIngredientsCategory{
  refCategory: RefObject<HTMLHeadingElement>
  type: string
  items: Array<TObjectIngredient>
}

const BurgerIngredientsCategory: React.FC<IPropsIngredientsCategory> = ({refCategory, type, items }) => {

  return (

    <div>
      <h3 ref = {refCategory}>{type}</h3>
      <ul className={s.list}>
      {
        items.map((item: TObjectIngredient, index: number) => {
          return (
            <BurgerIngredientsItem
              key = {item._id}
              srcImage={item.image}
              price={item.price}
              name={item.name}
              ingredient = {item}
              id = {item._id}
              index = {index}
            />
          )
        })
      }
      </ul>
    </div>
    
  )

}

export default BurgerIngredientsCategory
