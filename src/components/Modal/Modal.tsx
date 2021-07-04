import { Component } from 'react'
import {createPortal} from 'react-dom'
import ModalOverlay from '../ModalOverlay/ModalOverlay'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import s from './style.module.css'

interface IPropsModal{
  title?: string
  closedFunction?:() => void
}

class Modal extends Component <IPropsModal> {
  private $el: HTMLElement | null
  constructor(props: IPropsModal) {
    super(props)
    this.$el = document.getElementById('app-modals')
  }
  render() {
    return createPortal(
      <ModalOverlay closedFunction = {this.props.closedFunction}>
        <div className={`${s.modal} pt-5 pl-5 pr-5`}>
          <div className={s.header}>
            <span className='text text_type_main-large'>
              {this.props.title}
            </span>
            <span className={`${s.close} closed`} data-cy = "close">
              <CloseIcon type = "primary"/>
            </span>
          </div>
          {this.props.children}
        </div>
      </ModalOverlay>,
       // @ts-ignore: Unreachable code error
      this.$el
    )
  }
}

export default Modal
