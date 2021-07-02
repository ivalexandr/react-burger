export type TObjectIngredient = {
  calories?: number
  carbohydrates?: number
  fat?:number
  image:string
  image_large:string
  image_mobile:string
  name:string
  price:number
  proteins?:number
  type?:string
  __v?:number
  _id:string
}

export type TObjectOrder = {
  status: string
  _id: string
  number: number | string
  id:number
  ingredients: Array<string>
  name: string
}

export interface ILocation extends Location{
  background?:Location
}
// calories: 420
// carbohydrates: 53
// fat: 24
// image: "https://code.s3.yandex.net/react/code/bun-02.png"
// image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png"
// image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png"
// name: "Краторная булка N-200i"
// price: 1255
// proteins: 80
// type: "bun"
// __v: 0
// _id: "60d3b41abdacab0026a733c6"