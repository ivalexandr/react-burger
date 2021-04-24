import { useState, useEffect } from 'react'
import AppHeader from '../AppHeader/AppHeader'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import ApiServices from '../../services/api-services'
import './app.css'
import IngredientsDetails from '../IngredientsDetails/IngredientsDetails'
import OrderDetails from '../OrderDetails/OrderDetails'

function App() {
  const [ingredients, setIngredients] = useState([])
  const [dataConstructor, setDataConstructor] = useState([])
  const [bun, setBun] = useState(null)
  const [itemIngredients, setItemIngredients] = useState(null)
  const [show, setShow] = useState({isShowIngredients:false, isShowOrder:false})
  useEffect(() => {
    getData()
      window.addEventListener('keydown', handleDownKeyEsc)
    return () => {
      window.removeEventListener('keydown', handleDownKeyEsc)
    }
    // eslint-disable-next-line
  }, [])
  const getData = async () => {
    const data = await new ApiServices().getDataFromDataBase()
    setIngredients(data.data)
  }
  //Пока использую проброс пропсов для реализации BurgerConstructor, так как контекст и редакс не изучали
  const handleClickIngredient = item => {
    if (item.type === 'bun') {
      setBun(item)
    } else {
      setDataConstructor([...dataConstructor, item])
    }
    setItemIngredients(item)
    setShow({...show, isShowIngredients:true})
  }
  const handleClickButton = () => setShow({...show, isShowOrder:true})
    const handleClickModal = target => {
    if (target.classList.contains('closed') || target.classList.contains('overlay__closed'))
      setShow({...show, isShowIngredients:false, isShowOrder:false})
  }
  const handleDownKeyEsc = (e) => {
    if (e.key !== 'Escape') {
      return
    }
    setShow({...show, isShowIngredients:false, isShowOrder:false})
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
          <BurgerConstructor
            data={dataConstructor}
            bun={bun}
            handleClickButton={handleClickButton}
          />
        </div>
      </main>
    </>
  )
}
export default App
