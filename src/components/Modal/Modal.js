import { Component } from 'react'
import {createPortal} from 'react-dom'
import ModalOverlay from '../ModalOverlay/ModalOverlay'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import s from './style.module.css'

class Modal extends Component {
  constructor(props) {
    super(props)
    this.$el = document.getElementById('app-modals')
  }
  handleClick = e => {
    this.props.handleClickModal && this.props.handleClickModal(e.target)
  }
  render() {
    return createPortal(
      <ModalOverlay handleClickOverlay={this.handleClick}>
        <div className={`${s.modal} pt-5 pl-5 pr-5`}>
          <div className={s.header}>
            <span className='text text_type_main-large'>
              {this.props.title}
            </span>
            <span className={`${s.close} closed`}>
              <CloseIcon />
            </span>
          </div>
          {this.props.children}
        </div>
      </ModalOverlay>,
      this.$el
    )
  }
}
Modal.propTypes = {
  handleClickModal:PropTypes.func.isRequired,
  title: PropTypes.string
}
export default Modal
