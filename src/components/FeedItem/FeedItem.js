import { useHistory } from 'react-router-dom'
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import bun from '../../images/test/bun-01.png'
import core from '../../images/test/core.png'
import meat from '../../images/test/meat-03.png'
import rings from '../../images/test/rings.png'
import souce from '../../images/test/sauce-03.png'
import s from './style.module.css'

const FeedItem = ({id}) => {
    const history = useHistory()
    const clickHandler = () => {
        history.replace(`/feed/${id}`)
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
            <div className={`${s.footer}`}>
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