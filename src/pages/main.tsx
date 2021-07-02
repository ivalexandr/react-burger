import React from 'react'
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";

const Main:React.FC = () => {
    return(
        <>
            <div className='container' style={{ padding: '0 16px' }}>
                <h2 className="mb-2 mt-5 text text_type_main-large">Соберите бургер</h2>
            </div>
            <div className='container flex__wrapper'>
                <DndProvider backend = {HTML5Backend}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </DndProvider>
            </div>
        </>
    )
}
export default Main