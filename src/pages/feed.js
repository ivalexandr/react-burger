import {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import OrderFeed from "../components/OrderFeed/OrderFeed";
import { wsCloseSocketConnection, wsConnectionStart } from '../redux/webSocket/wsSlice';


const Feed = () => {
    const urlAll = 'wss://norma.nomoreparties.space/orders/all'
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(wsConnectionStart(urlAll))
        return () => {
        dispatch(wsCloseSocketConnection())
        }
    // eslint-disable-next-line
    }, [])
    return <OrderFeed />
}
export default Feed