import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import AppHeader from '../AppHeader/AppHeader'
import OrderDetails from '../OrderDetails/OrderDetails'
import {
  getIngredients,
  getUserData,
  refreshToken
} from '../../redux/actions'

import Routers from '../Routers/Routers'
import './app.css'

const App = () => {
  const dispatch = useDispatch()
  const {
    ingredients,
    isShowOrder,
    refreshStatus
  } = useSelector(store => ({
    isShowOrder: store.MODAL.isShowOrder,
    ingredients: store.INGREDIENTS.data,
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

  return (
    <>
      {isShowOrder && <OrderDetails />}
      <main className='main'>
        <Router>
          <AppHeader />
          <Routers
            ingredients={ingredients}
          />
        </Router>
      </main>
    </>
  )
}
export default App
