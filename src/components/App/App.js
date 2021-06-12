import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AppHeader from '../AppHeader/AppHeader'
import IngredientsDetails from '../IngredientsDetails/IngredientsDetails'
import OrderDetails from '../OrderDetails/OrderDetails'
import { getIngredients, getOrderNumber, getUserData, refreshToken } from '../../redux/actions'
import {
  removeIngredient,
  showIngredientsModal,
  showOrderModal,
  removeOrder
} from '../../redux/modal/modalSlice'
import Main from '../../pages/main'
import Page404 from '../../pages/404'
import Register from '../../pages/register'
import Login from '../../pages/login'
import ForgotPassword from '../../pages/forgot-password'
import ResetPassword from '../../pages/reset-password'
import Feed from '../../pages/feed'
import FeedId from '../../pages/feedId'
import Profile from '../../pages/profile'
import ProfileItemIInfo from '../../pages/profileItem - info'
import './app.css'
import ProfileList from '../../pages/profile-list'
import ProtectRoute from '../ProtectRoute/ProtectRoute'

const App = () => {
  const dispatch = useDispatch()
  const {
    ingredient,
    ingredients,
    dataConstructor,
    isShowIngredients,
    isShowOrder,
    refreshStatus
  } = useSelector(store => ({
    ingredient: store.MODAL.ingredient,
    isShowIngredients: store.MODAL.isShowIngredients,
    isShowOrder: store.MODAL.isShowOrder,
    ingredients: store.INGREDIENTS.data,
    dataConstructor: store.CONSTRUCTOR.data,
    refreshStatus:store.AUTH.refreshStatus
  }))

  useEffect(() => {
    dispatch(getIngredients())
    dispatch(refreshToken(localStorage.getItem('refreshToken')))
    window.addEventListener('keydown', handleDownKeyEsc)
    console.log('handle')
    return () => {
      window.removeEventListener('keydown', handleDownKeyEsc)
    }
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    dispatch(getUserData())
    // eslint-disable-next-line
  }, [refreshStatus])
  const handleClickButton = () => {
    if (!dataConstructor.length) return
    dispatch(getOrderNumber(dataConstructor))
    dispatch(showOrderModal(true))
  }
  const handleClickModal = target => {
    if (
      target.classList.contains('closed') ||
      target.classList.contains('overlay__closed')
    )
      dispatch(showOrderModal(false))
    dispatch(showIngredientsModal(false))
    dispatch(removeIngredient())
    dispatch(removeOrder())
  }
  const handleDownKeyEsc = e => {
    if (e.key !== 'Escape') {
      return
    }
    dispatch(showOrderModal(false))
    dispatch(showIngredientsModal(false))
    dispatch(removeIngredient())
    dispatch(removeOrder())
  }
  return (
    <>
      {isShowIngredients && (
        <IngredientsDetails
          item={ingredient}
          handleClickIngredients={handleClickModal}
        />
      )}
      {isShowOrder && <OrderDetails handleClickOrder={handleClickModal} />}

      <main className='main'>
        <Router basename='/'>
          <AppHeader />
          <Switch>
            <Route path='/' exact>
              <Main
                ingredients={ingredients}
                handleClickButton={handleClickButton}
              />
            </Route>
            <Route path='/register' exact>
              <Register />
            </Route>
            <Route path='/login' exact>
              <Login />
            </Route>
            <Route path='/forgot-password' exact>
              <ForgotPassword />
            </Route>
            <Route path='/reset-password' exact>
              <ResetPassword />
            </Route>
            <Route path='/feed' exact>
              <Feed />
            </Route>
            <Route path='/feed/:orderId' exact>
              <FeedId />
            </Route>
            <ProtectRoute path='/profile' exact>
              <Profile />
            </ProtectRoute>
            <ProtectRoute path='/profile/orders' exact>
              <ProfileList />
            </ProtectRoute>
            <ProtectRoute path='/profile/orders/:id' exact>
              <ProfileItemIInfo />
            </ProtectRoute>
            <Route path='*'>
              <Page404 />
            </Route>
          </Switch>
        </Router>
      </main>
    </>
  )
}
export default App
