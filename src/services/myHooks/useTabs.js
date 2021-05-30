import { useRef } from 'react'

const useTabs = (container, setState) => {

    const ref = useRef()

    const getTop = () => {
      const top = ref.current.getBoundingClientRect().top - container.getBoundingClientRect().top
      if(top < 70){
        setState(ref.current.textContent)
      }
    }

    return [ref, getTop]
}

export {useTabs}