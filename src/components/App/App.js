import { useState, useEffect, useReducer } from 'react'
import AppHeader from '../AppHeader/AppHeader'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import { apiServices } from '../../services/api-services'
import './app.css'
import IngredientsDetails from '../IngredientsDetails/IngredientsDetails'
import OrderDetails from '../OrderDetails/OrderDetails'
import { TotalCostContext } from '../../redux/TotalCost/context'
import { DataConstructorContext } from '../../redux/DataConstructor/DataConstructorContext'
import { ADD__ORDERED__NUMBER, PUSH__ITEM__DATA } from '../../redux/types'

function App() {
  const [ingredients, setIngredients] = useState([])
  const [bun, setBun] = useState(null)
  const [itemIngredients, setItemIngredients] = useState(null)
  const [show, setShow] = useState({
    isShowIngredients: false,
    isShowOrder: false
  })
  const [totalCost, totalCostDispatch] = useReducer(
    totalCostReducer,
    initialStateTotalCost
  )
  const [data, dataDispatch] = useReducer(
    dataConstructorReducer,
    initialStateDataConstuctor
  )

  useEffect(() => {
    getData()
    window.addEventListener('keydown', handleDownKeyEsc)
    return () => {
      window.removeEventListener('keydown', handleDownKeyEsc)
    }
    // eslint-disable-next-line
  }, [])
  const getData = async () => {
    try {
      const data = await apiServices.getDataFromDataBase()
      setIngredients(data.data)
    } catch (e) {
      console.error(e)
    }
  }
  const postData = async () => {
    try {
      const res = await apiServices.getOrderedNumber(data.data)
      if (res.success) {
        dataDispatch({ type: ADD__ORDERED__NUMBER, payload: res.order.number })
      }
    } catch (e) {
      console.error(e)
    }
  }
  const handleClickIngredient = item => {
    dataDispatch({ type: PUSH__ITEM__DATA, payload: item })
    if (item.type === 'bun') {
      setBun(item)
    }
    setItemIngredients(item)
    setShow({ ...show, isShowIngredients: true })
  }
  const handleClickButton = () => {
    postData()
    setShow({ ...show, isShowOrder: true })
  }
  const handleClickModal = target => {
    if (
      target.classList.contains('closed') ||
      target.classList.contains('overlay__closed')
    )
      setShow({ ...show, isShowIngredients: false, isShowOrder: false })
  }
  const handleDownKeyEsc = e => {
    if (e.key !== 'Escape') {
      return
    }
    setShow({ ...show, isShowIngredients: false, isShowOrder: false })
  }
  return (
    <>
      {show.isShowIngredients && (
        <IngredientsDetails
          item={itemIngredients}
          handleClickIngredients={handleClickModal}
        />
      )}
      {show.isShowOrder && (
        <OrderDetails
          handleClickOrder={handleClickModal}
          orderNumber={'034536'}
        />
      )}
      <AppHeader />
      <div className='container' style={{ padding: '0 16px' }}>
        <h2 className='mb-2 mt-5 text text_type_main-large'>Соберите бургер</h2>
      </div>
      <main className='main'>
        <div className='container flex__wrapper'>
          <BurgerIngredients
            handleClickIngredients={handleClickIngredient}
            data={ingredients}
          />
          <BurgerConstructor bun={bun} handleClickButton={handleClickButton} />
        </div>
      </main>
    </>
  )
}
export default App
