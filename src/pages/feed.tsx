import React, {useEffect} from 'react'
import { useAppDispatch } from '../redux/hooks';
import OrderFeed from "../components/OrderFeed/OrderFeed";
import { wsCloseSocketConnection, wsConnectionStart } from '../redux/webSocket/wsSlice';


const Feed:React.FC = () => {
    const urlAll: string = 'wss://norma.nomoreparties.space/orders/all'
    const dispatch = useAppDispatch()
    useEffect(() => {
        // @ts-ignore: Unreachable code error
        dispatch(wsConnectionStart(urlAll))
        return () => {
        dispatch(wsCloseSocketConnection())
        }
    // eslint-disable-next-line
    }, [])
    return <OrderFeed />
}
export default Feed