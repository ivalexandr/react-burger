import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  showOrderModal,
  removeIngredient,
  removeOrder
} from '../../redux/modal/modalSlice'
import s from './style.module.css'

const ModalOverlay = ({ children }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleDownKeyEsc)
    return () => {
      window.removeEventListener('keydown', handleDownKeyEsc)
    }
    // eslint-disable-next-line
  }, [])
  const handleDownKeyEsc = e => {
    if (e.key !== 'Escape') {
      return
    }
    history && history.replace('/')
    dispatch(showOrderModal(false))
    dispatch(removeIngredient())
    dispatch(removeOrder())
  }
  const history = useHistory()
  const dispatch = useDispatch()
  const handleClickOverlay = e => {
    if (e.target.classList.contains('overlay__closed') || e.target.classList.contains('closed')) {
      history && history.replace('/')
      dispatch(showOrderModal(false))
      dispatch(removeIngredient())
      dispatch(removeOrder())
    }
  }
  return (
    <div
      onClick={handleClickOverlay}
      className={`${s.overlay} overlay__closed`}>
      {children}
    </div>
  )
}
export default ModalOverlay
