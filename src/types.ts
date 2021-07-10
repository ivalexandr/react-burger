export type TObjectIngredient = {
  calories: number
  carbohydrates?: number
  fat:number
  image:string
  image_large:string
  image_mobile:string
  name:string
  price:number
  proteins:number
  type:string
  __v:number
  _id: string
  key?: number
}

export type TObjectOrder = {
  status: string
  _id: string
  number: number | string
  id:number
  ingredients: Array<string>
  name: string
  createdAt: string
}

export type TObjectItemDnd = {
  id:string | number
  ingredient: TObjectIngredient
}

