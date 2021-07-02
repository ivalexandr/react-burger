import React from 'react'
import {useParams} from "react-router-dom";
import OrderItem from "../components/OrderItem/OrderItem";

const ProfileItemInfo: React.FC = () => {
    const { id } = useParams<{id: string}>()
    return <OrderItem id ={id} />
}
export default ProfileItemInfo