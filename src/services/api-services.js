const API_NORMA = 'https://norma.nomoreparties.space/api/ingredients'

class ApiServices{
  constructor(){
    this.apiUrl = API_NORMA
  }
    async getDataFromDataBase(){
        try{
          const response = await fetch(this.apiUrl)
          if(!response.ok) throw new Error('Ответ от сервера не ОК')
            return await response.json()
        }catch(e){
          throw new Error(`Кажется произошла ошибка : ${e}`)
        }
    }
}
export const apiServices = new ApiServices()