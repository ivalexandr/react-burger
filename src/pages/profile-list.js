import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import OrderList from "../components/OrderList/OrderList";
import ProfileNavBar from "../components/ProfileNavBar/ProfileNavBar";
import { wsConnectionClosed, wsConnectionStart } from '../redux/webSocket/wsSlice';
import { getCookie } from '../services/cookie';

const ProfileList = () => {
    const urlUser = `wss://norma.nomoreparties.space/orders?token=${getCookie('accessToken')}`
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(wsConnectionStart(urlUser))
        return () => {
        dispatch(wsConnectionClosed())
        }
     // eslint-disable-next-line
    }, [])
    return  <div className="container pt-25 df">
        <ProfileNavBar />
        <OrderList />
    </div>
}
export default ProfileList