import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppHeader from '../AppHeader/AppHeader'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import IngredientsDetails from '../IngredientsDetails/IngredientsDetails'
import OrderDetails from '../OrderDetails/OrderDetails'
import { DndProvider } from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import { getIngredients, getOrderNumber } from '../../redux/actions'
import { removeIngredient, showIngredientsModal, showOrderModal, removeOrder } from '../../redux/modal/modalSlice'
import './app.css'

const App = () => {
  const dispatch = useDispatch()
  const { ingredient, ingredients, dataConstructor,isShowIngredients, isShowOrder  } = useSelector(store => ({
    ingredient:store.MODAL.ingredient,
    isShowIngredients:store.MODAL.isShowIngredients,
    isShowOrder:store.MODAL.isShowOrder,
    ingredients:store.INGREDIENTS.data,
    dataConstructor:store.CONSTRUCTOR.data,
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
    dispatch(getOrderNumber(dataConstructor))
    dispatch(showOrderModal(true))
  }
  const handleClickModal = target => {
    if (
      target.classList.contains('closed') ||
      target.classList.contains('overlay__closed')
    )
    dispatch(showOrderModal(false))
    dispatch(showIngredientsModal(false))
    dispatch(removeIngredient())
    dispatch(removeOrder())
  }
  const handleDownKeyEsc = e => {
    if (e.key !== 'Escape') {
      return
    }
    dispatch(showOrderModal(false))
    dispatch(showIngredientsModal(false))
    dispatch(removeIngredient())
    dispatch(removeOrder())
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
