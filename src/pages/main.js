import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";
import { PropTypes } from "prop-types";
const Main = ({ingredients, handleClickButton}) => {
    return(
        <>
            <div className='container' style={{ padding: '0 16px' }}>
                <h2 className="mb-2 mt-5 text text_type_main-large">Соберите бургер</h2>
            </div>
            <div className='container flex__wrapper'>
                <DndProvider backend = {HTML5Backend}>
                    <BurgerIngredients data={ingredients} />
                    <BurgerConstructor handleClickButton={handleClickButton} />
                </DndProvider>
            </div>
        </>
    )
}
Main.propTypes = {
    ingredients: PropTypes.array,
    handleClickButton:PropTypes.func,
}
export default Main