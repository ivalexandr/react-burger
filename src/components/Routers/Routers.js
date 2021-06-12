import { Switch, Route, useLocation } from 'react-router-dom'
import IngredientsDetailsNoModal from '../IngredientsDetailsNoModal/IngredientsDetailsNoModal'
import ProtectRoute from '../ProtectRoute/ProtectRoute'
import IngredientsDetails from '../IngredientsDetails/IngredientsDetails'
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
import ProfileList from '../../pages/profile-list'
import FeedItemModal from '../FeedItemModal/FeedItemModal'

const Routers = ({ ingredients, handleClickButton, ingredient }) => {
  const location = useLocation()
  const background = location.state && location.state.background

  return (
    <>
      <Switch>
        <Route path='/' exact>
          <Main
            ingredients={ingredients}
            handleClickButton={handleClickButton}
          />
        </Route>
        <Route path='/ingredients/:id'>
          <IngredientsDetailsNoModal />
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
        <Route path='/feed/:id' exact>
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
      <Route path='/ingredients/:id'>
        {background && <IngredientsDetails item={ingredient} />}
      </Route>
      <Route path='/feed/:id'>{background && <FeedItemModal />}</Route>
      <Route path='/profile/orders/:id'>{background && <FeedItemModal />}</Route>
    </>
  )
}
export default Routers
