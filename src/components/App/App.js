import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getIngredients } from '../../redux/DataIngredients/dataIngredientsReducer'
import { getOrderedNumber } from '../../redux/Modal/modalReducer'
import AppHeader from '../AppHeader/AppHeader'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import IngredientsDetails from '../IngredientsDetails/IngredientsDetails'
import OrderDetails from '../OrderDetails/OrderDetails'
import { DndProvider } from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {  SHOW__INGREDIENTS__DETAILS, SHOW__ORDER__DETAILS, DELETE__INGREDIENT, REMOVE__ORDERED__DATA } from '../../redux/types'
import './app.css'


const App = () => {
  const dispatch = useDispatch()
  const { ingredient, ingredients, dataConstructor,isShowIngredients, isShowOrder  } = useSelector(store => ({
    ingredient:store.modalData.ingredient,
    isShowIngredients:store.modalData.isShowIngredients,
    isShowOrder:store.modalData.isShowOrder,
    ingredients:store.dataIngredients.ingredients,
    dataConstructor:store.burgerConstructor.data,
  }))
  
  useEffect(() => {
    dispatch(getIngredients())
    window.addEventListener('keydown', handleDownKeyEsc)
    
    return () => {
      window.removeEventListener('keydown', handleDownKeyEsc)
    }
    // eslint-disable-next-line
  }, [])
  const handleClickButton = () => {
    if(!dataConstructor.length) return
    dispatch(getOrderedNumber(dataConstructor))
    dispatch({type:SHOW__ORDER__DETAILS, payload:true})
  }
  const handleClickModal = target => {
    if (
      target.classList.contains('closed') ||
      target.classList.contains('overlay__closed')
    )
    dispatch({type:SHOW__INGREDIENTS__DETAILS, payload:false})
    dispatch({type:SHOW__ORDER__DETAILS, payload:false})
    dispatch({type:DELETE__INGREDIENT})
    dispatch({type:REMOVE__ORDERED__DATA})
  }
  const handleDownKeyEsc = e => {
    if (e.key !== 'Escape') {
      return
    }
    dispatch({type:SHOW__INGREDIENTS__DETAILS, payload:false})
    dispatch({type:SHOW__ORDER__DETAILS, payload:false})
    dispatch({type:DELETE__INGREDIENT})
    dispatch({type:REMOVE__ORDERED__DATA})
  }
  return (
    <>
      {isShowIngredients && (
        <IngredientsDetails
          item={ingredient}
          handleClickIngredients={handleClickModal}
        />
      )}
      {isShowOrder && (
        <OrderDetails
          handleClickOrder={handleClickModal}
        />
      )}
      <AppHeader />
      <div className='container' style={{ padding: '0 16px' }}>
        <h2 className='mb-2 mt-5 text text_type_main-large'>Соберите бургер</h2>
      </div>
      <main className='main'>
        <div className='container flex__wrapper'>
          <DndProvider backend = {HTML5Backend}>
            <BurgerIngredients data={ingredients} />
            <BurgerConstructor handleClickButton={handleClickButton} />
          </DndProvider>
        </div>
      </main>
    </>
  )
}
export default App
