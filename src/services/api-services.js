// const API_NORMA = 'https://norma.nomoreparties.space/api/ingredients'
const generateApiUrl = (address) => {
  return `https://norma.nomoreparties.space/api/${address}`
}
class ApiServices{
  constructor(){
    this.apiUrlIngredients = generateApiUrl(`ingredients`)
    this.apiUrlOrders = generateApiUrl('orders')
  }
    async getDataFromDataBase(){
        try{
          const response = await fetch(this.apiUrlIngredients)
          if(!response.ok) throw new Error('Ответ от сервера не ОК')
            return await response.json()
        }catch(e){
          throw new Error(`Кажется произошла ошибка : ${e}`)
        }
    }
    async getOrderedNumber(data){
      const id = data.map(item => item._id)
      const isBun = data.find(item => item.type === 'bun')
        try {
          if(data.length === 0) throw new Error('Пустой массив передавать нельзя!!!')
          if(isBun === undefined) throw new Error('Без булки нельзя!!!')
          const body = { ingredients:id }
          const response = await fetch(this.apiUrlOrders, {
            method:'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body:JSON.stringify(body)
          })
          if(!response.ok) throw new Error('Ответ от сервера не ОК')
            return await response.json()
        } catch (e) {
          throw new Error(`Ошибка в getOrderedNumber: ${e}` )
        }
    }
}
export const apiServices = new ApiServices()