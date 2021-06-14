import PropTypes from 'prop-types'
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import bun from '../../images/test/bun-01.png'
import core from '../../images/test/core.png'
import meat from '../../images/test/meat-03.png'

import s from './style.module.css'

const OrderItem = ({id, status}) => {
return (
    <div className={s.wrapper}>
        <div className={s.info}>
            <div className={`${s.header} text text_type_digits-default mb-10`}>
                #{id}
            </div>
            <div className={`mb-10`}>
                <h3 className={`text text_type_main-medium mb-3`}>BlackHole Singularity острый бургер</h3>
                <span className={`${s.status} mb-15`}>{status}</span>
                <div className={`${s.structure}`}>
                    <h3 className="text text_type_main-medium mb-6">Состав:</h3>
                    <ul className={`${s.list}`}>
                        <li className={`${s.item}`}>
                            <div className = {s.img}>
                                <img src={bun} alt=""/>
                            </div>
                            <span>Флюорисцентная булка R2-D3</span>
                            <span className={s.price}> 2 x 20 <CurrencyIcon type="primary"/> </span>
                        </li>
                        <li className={`${s.item}`}>
                            <div className = {s.img}>
                                <img src={core} alt=""/>
                            </div>
                            <span>Флюорисцентная булка R2-D3</span>
                            <span className={s.price}> 2 x 20 <CurrencyIcon type="primary"/> </span>
                        </li>
                        <li className={`${s.item}`}>
                            <div className = {s.img}>
                                <img src={meat} alt=""/>
                            </div>
                            <span>Флюорисцентная булка R2-D3</span>
                            <span className={s.price}> 2 x 20 <CurrencyIcon type="primary"/> </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={`${s.footer}`}>
                <span className="text text_type_main-default text_color_inactive">Вчера, 13:50 i - GMT+3</span>
                <span className={`${s.total}`}>510 <CurrencyIcon type={"primary"}/></span>
            </div>
        </div>
    </div>
)
}
OrderItem.propType = {
    id:PropTypes.number,
    status:PropTypes.string,
}
export default OrderItem