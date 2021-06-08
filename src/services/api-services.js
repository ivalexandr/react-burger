    // POST https://norma.nomoreparties.space/api/auth/login - эндпоинт для авторизации.
    // POST https://norma.nomoreparties.space/api/auth/register - эндпоинт для регистрации пользователя.
    // POST https://norma.nomoreparties.space/api/auth/logout - эндпоинт для выхода из системы.
    // POST https://norma.nomoreparties.space/api/auth/token - эндпоинт обновления токена.

const generateApiUrl = (address) => {
  return `https://norma.nomoreparties.space/api/${address}`
}
class ApiServices{
  constructor(){
    this.apiUrlIngredients = generateApiUrl(`ingredients`)
    this.apiUrlOrders = generateApiUrl('orders')
    this.apiRegisterUser = generateApiUrl('auth/register')
    this.apiLoginUser = generateApiUrl('auth/login')
    this.apiLogoutUser = generateApiUrl('auth/logout')
    this.apiRefreshToken = generateApiUrl('auth/token')
    this.apiResetPassSearch = generateApiUrl('password-reset')
    this.apiResetPass = generateApiUrl('password-reset/reset')

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
  async registerUser(data){
    try{
      const res = await fetch(this.apiRegisterUser,{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
      })
      if(!res.ok) throw new Error('Ответ от сервера не ОК')
      return await res.json()
    }catch(e){
      throw new Error(`Ошибка отправки данных : ${e}` )
    }
  }
  async loginUser(data){
    try{
      const res = await fetch(this.apiLoginUser, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
      })
      if(!res.ok) throw new Error('Ответ от сервера не ОК')
      return await res.json()
    }catch(e){
      throw new Error(`Ошибка отправки данных : ${e}` )
    }
  }
  async refreshToken(refreshToken){
    try{
      const res = await fetch(this.apiRefreshToken, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(refreshToken)
      })
      if(!res.ok) throw new Error('Ответ от сервера не ОК')
    }catch(e){
      throw new Error(`Ошибка отправки данных : ${e}` )
    }
  }
    async resetPasswordSearch(email){
      try{
        const res = await fetch(this.apiResetPassSearch, {
          method:'POST',
          body:email
        })
        if(!res.ok) throw new Error('Ответ от сервера не ОК')
        return await res.json()
      }catch (e) {
        throw new Error(`Ошибка отправки данных : ${e}` )
      }
    }
    async resetPassword(data){
      try{
        const res = await fetch(this.apiResetPass, {
          method:'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(data)
        })
        if(!res.ok) throw new Error('Ответ от сервера не ОК')
        return await res.json()
      }catch(e){
        throw new Error(`Ошибка отправки данных : ${e}` )
      }
    }
}
export const apiServices = new ApiServices()