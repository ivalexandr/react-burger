// POST https://norma.nomoreparties.space/api/auth/login - эндпоинт для авторизации.
// POST https://norma.nomoreparties.space/api/auth/register - эндпоинт для регистрации пользователя.
// POST https://norma.nomoreparties.space/api/auth/logout - эндпоинт для выхода из системы.
// POST https://norma.nomoreparties.space/api/auth/token - эндпоинт обновления токена.

import { getCookie, setCookie } from './cookie'

const generateApiUrl = address => {
  return `https://norma.nomoreparties.space/api/${address}`
}
class ApiServices {
  constructor() {
    this.apiUrlIngredients = generateApiUrl(`ingredients`)
    this.apiUrlOrders = generateApiUrl('orders')
    this.apiRegisterUser = generateApiUrl('auth/register')
    this.apiLoginUser = generateApiUrl('auth/login')
    this.apiLogoutUser = generateApiUrl('auth/logout')
    this.apiRefreshToken = generateApiUrl('auth/token')
    this.apiResetPassSearch = generateApiUrl('password-reset')
    this.apiResetPass = generateApiUrl('password-reset/reset')
    this.apiGetUserData = generateApiUrl('auth/user')
  }
  checkResponse(res) {
    return res.ok ? res.json() : res.json().then(e => Promise.reject(e))
  }
  async fetchRefreshData(api, options){
    try {
      const res = await fetch(api, options)
    return await this.checkResponse(res)
    } catch (e) {
      if (e.message === 'jwt expired') {
        const refresh = await this.refreshToken()
        localStorage.setItem('refreshToken', refresh.refreshToken)

        setCookie('accessToken', refresh.accessToken.split('Bearer ')[1])

        options.headers.Autorization = `Bearer ${refresh.refreshToken}`

        const res = await fetch(api, options)
        return await this.checkResponse(res)
      } else {
        return Promise.reject()
      }
    }
  }
  async getDataFromDataBase() {
    try {
      const response = await fetch(this.apiUrlIngredients)
      if (!response.ok) throw new Error('Ответ от сервера не ОК')
      return await response.json()
    } catch (e) {
      throw new Error(e)
    }
  }
  async getOrderedNumber(data) {
    const id = data.map(item => item._id)
    const isBun = data.find(item => item.type === 'bun')
    try {
      if (data.length === 0)
        throw new Error('Пустой массив передавать нельзя!!!')
      if (isBun === undefined) throw new Error('Без булки нельзя!!!')
      const body = { ingredients: id }
      console.log('#####',id)
      
      const response = await fetch(this.apiUrlOrders, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getCookie('accessToken')}`
        },
        body: JSON.stringify(body)
      })
      if (!response.ok) throw new Error('Ответ от сервера не ОК')
      return await response.json()
    } catch (e) {
      throw new Error(e)
    }
  }
  async registerUser(data) {
    try {
      const res = await fetch(this.apiRegisterUser, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      if (!res.ok) throw new Error('Ответ от сервера не ОК')
      return await res.json()
    } catch (e) {
      throw new Error(e)
    }
  }
  async loginUser(data) {
    try {
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
      if (!res.ok) throw new Error('Ответ от сервера не ОК')
      return await res.json()
    } catch (e) {
      throw new Error(e)
    }
  }
  async refreshToken() {
    try {
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
        body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
      })
      if (!res.ok) throw new Error('Ответ от сервера не ОК')
      return await res.json()
    } catch (e) {
      throw new Error(e)
    }
  }
  async resetPasswordSearch(email) {
    try {
      const res = await fetch(this.apiResetPassSearch, {
        method: 'POST',
        body: email
      })
      if (!res.ok) throw new Error('Ответ от сервера не ОК')
      return await res.json()
    } catch (e) {
      throw new Error(e)
    }
  }
  async resetPassword(data) {
    try {
      const res = await fetch(this.apiResetPass, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      if (!res.ok) throw new Error('Ответ от сервера не ОК')
      return await res.json()
    } catch (e) {
      throw new Error(e)
    }
  }
  async getUserData() {
    return await this.fetchRefreshData(this.apiGetUserData, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    })
  }

  async setUserData(data) {
    return await this.fetchRefreshData(this.apiGetUserData, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
      body: JSON.stringify(data)
    })
    }

  async logoutUser() {
    try {
      const res = await fetch(this.apiLogoutUser, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({token:localStorage.getItem('refreshToken')})
      })
      if (!res.ok) throw new Error('Ответ от сервера не ОК')
      return await res.json()
    } catch (e) {
      throw new Error(e)
    }
  }
}
export const apiServices = new ApiServices()
