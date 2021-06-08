import {useParams} from "react-router-dom";
import OrderItem from "../components/OrderItem/OrderItem";

const ProfileItemInfo = () => {
    const { id } = useParams()
    return <OrderItem id ={+id} status="Выполнен"/>
}
export default ProfileItemInfo