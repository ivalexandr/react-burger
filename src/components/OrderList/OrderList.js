import FeedItem from "../FeedItem/FeedItem";
import s from './style.module.css'
const OrderList = () => {
    return (
            <div className={`${s.list} pr-2 pl-2`}>
                <FeedItem id = {12354} />
                <FeedItem id = {25434} />
                <FeedItem id = {32133} />
                <FeedItem />
                <FeedItem />
                <FeedItem />
                <FeedItem />
            </div>
    )
}
export default OrderList