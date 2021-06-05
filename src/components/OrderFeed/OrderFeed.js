import FeedItem from "../FeedItem/FeedItem";
import s from './style.module.css'

const OrderFeed = () => {
    return (
        <div className={`container ${s.wrapper}`}>
            <h2 className= "mb-5 mt-5 text text_type_main-large">Лента заказов</h2>
            <div className={s.container}>
                <div className={`${s.feed} pr-2 pl-2`}>
                    <FeedItem id = {12354}/>
                    <FeedItem id = {25434} />
                    <FeedItem id = {32133}/>
                    <FeedItem />
                    <FeedItem />
                    <FeedItem />
                    <FeedItem />
                </div>
                <div className={s.statistic}>
                    <div className = {`${s.header} mb-15`}>
                        <div className={`${s.done} mr-9`}>
                            <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
                                <ul className={s.list}>
                                    <li className="text text_type_digits-default mb-2">034533</li>
                                    <li className="text text_type_digits-default mb-2">034533</li>
                                    <li className="text text_type_digits-default mb-2">034533</li>
                                    <li className="text text_type_digits-default mb-2">034533</li>
                                    <li className="text text_type_digits-default">034533</li>
                                </ul>
                        </div>
                        <div className = {`${s.inWork}`}>
                            <h3 className="text text_type_main-medium mb-6">В работе:</h3>
                                <ul className={s.list}>
                                    <li className="text text_type_digits-default mb-2">034533</li>
                                    <li className="text text_type_digits-default mb-2">034533</li>
                                    <li className="text text_type_digits-default">034533</li>
                                </ul>
                        </div>
                    </div>
                    <div className = {`mb-15`}>
                        <h3 className="text text_type_main-medium">Выполнено за всё время:</h3>
                        <div className={`${s.allDone} text text_type_digits-large`}>28752</div>
                    </div>
                    <div>
                        <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
                        <div className={`${s.allDay} text text_type_digits-large`}>138</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default OrderFeed