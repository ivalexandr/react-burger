import {useParams} from 'react-router-dom'
import OrderItem from '../components/OrderItem/OrderItem';

const FeedId = () => {
    const { orderId } = useParams()
    console.log(orderId)
    return <OrderItem
        id = {+orderId}
        status="Выполнен"
    />
}
export default FeedId