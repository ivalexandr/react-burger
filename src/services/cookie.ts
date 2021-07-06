
type TPropsCookie = {
[key: string]: string | boolean
}

const setCookie = (name: string, value: string, props?: TPropsCookie): void => {
  props = props || {}
  props = {
    path: '/',
    ...props
  }
  let exp = props.expires
  if (typeof exp == 'number' && exp) {
    const d = new Date()
    d.setTime(d.getTime() + exp * 1000)
    exp = props.expires = d.toUTCString()
  }
  if (exp) {
    props.expires = exp
  }
  value = encodeURIComponent(value)
  let updatedCookie = name + '=' + value
  for (const propName in props) {
    updatedCookie += '; ' + propName
    const propValue = props[propName]
    if (propValue !== true) {
      updatedCookie += '=' + propValue
    }
  }
  document.cookie = updatedCookie
}
const getCookie = (name: string): string | undefined => {
  const matches = document.cookie.match(
    // eslint-disable-next-line
    new RegExp(
      '(?:^|; )' + // eslint-disable-next-line
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)'
    )
  )
  return matches ? decodeURIComponent(matches[1]) : undefined
}

export { setCookie, getCookie }
