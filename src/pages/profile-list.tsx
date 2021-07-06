import React, { useEffect } from 'react'
import { useAppDispatch } from '../redux/hooks';
import OrderList from "../components/OrderList/OrderList";
import ProfileNavBar from "../components/ProfileNavBar/ProfileNavBar";
import { wsConnectionClosed, wsConnectionStart } from '../redux/webSocket/wsSlice';
import { getCookie } from '../services/cookie';

const ProfileList:React.FC = () => {
    const urlUser: string = `wss://norma.nomoreparties.space/orders?token=${getCookie('accessToken')}`
    const dispatch = useAppDispatch()
    useEffect(() => {
        // @ts-ignore: Unreachable code error
        dispatch(wsConnectionStart(urlUser))
        return () => {
            // @ts-ignore: Unreachable code error
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