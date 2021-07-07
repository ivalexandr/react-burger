import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import s from './style.module.css'

interface IPropsModal {
  closedFunction?: () => void
}

const ModalOverlay: React.FC<IPropsModal> = ({ children, closedFunction }) => {
  const history = useHistory()
  useEffect(() => {
    window.addEventListener('keydown', handleDownKeyEsc)
    return () => {
      window.removeEventListener('keydown', handleDownKeyEsc)
    }
    // eslint-disable-next-line
  }, [])
  const handleDownKeyEsc = (e: globalThis.KeyboardEvent): void => {
    if (e.key !== 'Escape') {
      return
    }
    closedFunction && closedFunction()
    history && history.goBack()
  }

  const handleClickOverlay = (e: any): void => {
    if (
      e.target.classList.contains('overlay__closed') ||
      e.target.classList.contains('closed')
    ) {
      closedFunction && closedFunction()
      history && history.goBack()
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
