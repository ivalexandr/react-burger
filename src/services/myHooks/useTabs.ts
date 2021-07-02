import { useRef } from 'react'


const useTabs = (container:HTMLDivElement | null, setState:Function): [any, Function] => {
    const ref = useRef<HTMLHeadingElement>()
    const getTop = (): void => {
      if(!container || !ref || !ref.current) return
      const top = ref?.current?.getBoundingClientRect()?.top - container.getBoundingClientRect().top
      if(top < 70){
        setState(ref?.current?.textContent)
      }
    }
    return [ref, getTop]
}

export {useTabs}