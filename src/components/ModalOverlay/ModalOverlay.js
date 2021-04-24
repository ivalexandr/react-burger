import PropTypes from 'prop-types'
import s from './style.module.css'

const ModalOverlay = ({ children, handleClickOverlay }) => {
  return (
    <div
      onClick={handleClickOverlay}
      className={`${s.overlay} overlay__closed`}>
      {children}
    </div>
  )
}
ModalOverlay.propTypes = {
  handleClickOverlay: PropTypes.func.isRequired
}
export default ModalOverlay
