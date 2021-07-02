import React from 'react'
import { Switch , Route, useLocation, useHistory } from 'react-router-dom'
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


const Routers:React.FC = () => {
  const history = useHistory<History>()
  const location = useLocation<Location>()
  // @ts-ignore: Unreachable code error 
  const bg = (history.action === "PUSH" || history.action === "REPLACE") && location?.state?.background
  
  return (
    <>
      <Switch location = {bg || location}>
        <Route exact path='/'  children = { <Main />} />
        <Route path='/ingredients/:id' children = {<IngredientsDetailsNoModal />} />
        <Route exact path='/feed' children = { <Feed />} />
        <Route path='/feed/:id' children = { <FeedId />} />
        <Route path='/register' children = {<Register />} />
        <Route exact path='/login' children = { <Login />} />
        <Route path='/forgot-password' children = {<ForgotPassword />} />
        <Route path='/reset-password' children = {<ResetPassword />} />
        <ProtectRoute exact path='/profile' children = {<Profile />} />
        <ProtectRoute exact path='/profile/orders' children = { <ProfileList />} />
        <ProtectRoute exact path='/profile/orders/:id' children = {<ProfileItemIInfo />} />
        <Route path='*' children = {<Page404 />} />
      </Switch>
        {bg && <Route path='/ingredients/:id' children = {<IngredientsDetails />}/>}
        {bg && <Route path='/feed/:id' children = {<FeedItemModal />} />}
        {bg && <Route path='/profile/orders/:id' children = {<FeedItemModal />} />}
    </>
  )
}
export default Routers
