import { useHistory, useRouteMatch } from 'react-router-dom'
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import bun from '../../images/test/bun-01.png'
import core from '../../images/test/core.png'
import meat from '../../images/test/meat-03.png'
import rings from '../../images/test/rings.png'
import souce from '../../images/test/sauce-03.png'
import s from './style.module.css'

const FeedItem = ({id, status }) => {
    const history = useHistory()
    const { path } = useRouteMatch()
    const clickHandler = () => {
        history.replace(`${path}/${id}`)
    }
    return (
        <div className={`${s.wrapper} p-6 mt-4`} onClick = {clickHandler}>
            <div className={`${s.header} mb-6`}>
                <span className = "text text_type_digits-default">#034535</span>
                <span className = "text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</span>
            </div>
            <div className={`${s.body} mb-6`}>
                Death Star Starship Main бургер
            </div>
            {status === 'canceled'
                ? <span className={`${s.canceled} text text_type_main-small`}>Отменен</span>
                : status === 'done'
                ? <span className = {`${s.done} text text_type_main-small`}>Выполнен</span>
                : status === 'preparing'
                ? <span className = {`${s.preparing} text text_type_main-small`}>Готовится</span>
                : null
            }
            <div className={`${s.footer} mt-6`}>
                <div className={s.images}>
                    <div className={s.round}>
                        <img src={bun} alt=""/>
                    </div>
                    <div className={s.round}>
                        <img src={core} alt=""/>
                    </div>
                    <div className={s.round}>
                        <img src={meat} alt=""/>
                    </div>
                    <div className={s.round}>
                        <img src={rings} alt=""/>
                    </div>
                    <div className={s.round}>
                        <img src={souce} alt=""/>
                    </div>
                </div>
                <span className={`${s.price} text text_type_digits-default`}>
                    480 
                    <CurrencyIcon type="primary" />
                </span>
            </div>
        </div>
    )
}

export default FeedItem