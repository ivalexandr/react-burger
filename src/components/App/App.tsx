import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { BrowserRouter as Router } from 'react-router-dom'
import AppHeader from '../AppHeader/AppHeader'
import OrderDetails from '../OrderDetails/OrderDetails'
import { getUserData, refreshToken, getIngredients } from '../../redux/actions'
import Routers from '../Routers/Routers'
import './app.css'

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const { isShowOrder, refreshStatus } = useAppSelector(store => ({
    isShowOrder: store.MODAL.isShowOrder,
    refreshStatus: store.AUTH.refreshStatus
  }))
  useEffect(() => {
    if (localStorage.getItem('refreshToken')) dispatch(refreshToken())
    dispatch(getIngredients())
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
          <Routers />
        </Router>
      </main>
    </>
  )
}
export default App
