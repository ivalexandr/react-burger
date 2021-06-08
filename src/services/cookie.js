const setCookie = (name, value, options = {}) => {
    if(options.expires instanceof Date){
        options.expires = options.expires.toUTCString()
    }
    let updateCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
    for(const optionKey in options){
        updateCookie += "; " + optionKey
        let optionValue = options[optionKey]
        if (optionValue !== true) {
            updateCookie += "=" + optionValue
        }
    }
    document.cookie = updateCookie
}
const getCookie = (name) => {
    const matches = document.cookie.match(
        // eslint-disable-next-line
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'))
    return matches ? decodeURIComponent(matches[1]) : undefined
}

export {
    setCookie,
    getCookie
}