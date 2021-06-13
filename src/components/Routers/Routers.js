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
import FeedItemModal from '../OrderFeedModal/OrderFeedModal'

const Routers = ({ ingredients, handleClickButton }) => {
  const location = useLocation()
  let background = location.state && location.state.background
  
  return (
    <>
      <Switch location = {background || location}>
        <Route exact path='/'  children = { <Main ingredients={ingredients} handleClickButton={handleClickButton} />} />
        <Route path='/ingredients/:id' children = {<IngredientsDetailsNoModal />} />
        <Route path='/register' children = {<Register />} />
        <Route path='/login' children = { <Login />} />
        <Route path='/forgot-password' children = {<ForgotPassword />} />
        <Route path='/reset-password' children = {<ResetPassword />} />
        <Route exact path='/feed' children = { <Feed />} />
        <Route path='/feed/:id' children = { <FeedId />} />
        <ProtectRoute exact path='/profile' children = {<Profile />} />
        <ProtectRoute exact path='/profile/orders' children = { <ProfileList />} />
        <ProtectRoute path='/profile/orders/:id' children = {<ProfileItemIInfo />} />
        <Route path='*' children = {<Page404 />} />
      </Switch>
      {background && <Route path='/ingredients/:id' children = {<IngredientsDetails />}/>}
      {background && <Route path='/feed/:id' children = {<FeedItemModal />} />}
      {background && <Route path='/profile/orders/:id' children = {<FeedItemModal />} />}
    </>
  )
}
export default Routers
