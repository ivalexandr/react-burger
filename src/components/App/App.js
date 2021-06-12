import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import AppHeader from '../AppHeader/AppHeader'
import OrderDetails from '../OrderDetails/OrderDetails'
import {
  getIngredients,
  getOrderNumber,
  getUserData,
  refreshToken
} from '../../redux/actions'
import { showOrderModal } from '../../redux/modal/modalSlice'

import Routers from '../Routers/Routers'
import './app.css'

const App = () => {
  const dispatch = useDispatch()
  const {
    ingredient,
    ingredients,
    dataConstructor,
    isShowOrder,
    refreshStatus
  } = useSelector(store => ({
    ingredient: store.MODAL.ingredient,
    isShowOrder: store.MODAL.isShowOrder,
    ingredients: store.INGREDIENTS.data,
    dataConstructor: store.CONSTRUCTOR.data,
    refreshStatus: store.AUTH.refreshStatus
  }))
  useEffect(() => {
    dispatch(getIngredients())
    if (localStorage.getItem('refreshToken'))
      dispatch(refreshToken(localStorage.getItem('refreshToken')))
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    if (localStorage.getItem('refreshToken')) dispatch(getUserData())
    // eslint-disable-next-line
  }, [refreshStatus])
  const handleClickButton = () => {
    if (!dataConstructor.length) return
    dispatch(getOrderNumber(dataConstructor))
    dispatch(showOrderModal(true))
  }
  return (
    <>
      {isShowOrder && <OrderDetails />}

      <main className='main'>
        <Router basename='/'>
          <AppHeader />
          <Routers
            ingredients={ingredients}
            ingredient={ingredient}
            handleClickButton={handleClickButton}
          />
        </Router>
      </main>
    </>
  )
}
export default App
