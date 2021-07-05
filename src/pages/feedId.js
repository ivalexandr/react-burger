import {useParams} from 'react-router-dom'
import OrderItem from '../components/OrderItem/OrderItem';

const FeedId = () => {
    const { id } = useParams()
    return <OrderItem
        id = {+id}
    />
}
export default FeedId