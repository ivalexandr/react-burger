import { useState, useEffect } from 'react'
import AppHeader from '../AppHeader/AppHeader'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import { data, dataConstructor, dataBun } from '../../utils/data'
import './app.css'

function App() {
  const [ingredients, setIngredients] = useState([])
  //Как-будто получаем данные с сервера...
  // eslint-disable-next-line
  useEffect(() => setIngredients(data), [])
  return (
    <>
      <AppHeader />
      <div className='container' style={{ padding: '0 16px' }}>
        <h2 className='mb-2 mt-5 text text_type_main-large'>Соберите бургер</h2>
      </div>
      <main className='main'>
        <div className='container flex__wrapper'>
          <BurgerIngredients data={ingredients} />
          {/* Пока что так потому что логику приложения не пишем еще, пока только вёрстка */}
          <BurgerConstructor data = {dataConstructor} bun = {dataBun}/>
        </div>
      </main>
    </>
  )
}
export default App
