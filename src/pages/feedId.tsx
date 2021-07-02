import React from 'react'
import {useParams} from 'react-router-dom'
import OrderItem from '../components/OrderItem/OrderItem';

const FeedId:React.FC = () => {
    const { id } = useParams<{id: string}>()
    return <OrderItem
        id = {id}
    />
}
export default FeedId