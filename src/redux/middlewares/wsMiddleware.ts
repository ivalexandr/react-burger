import { Middleware, MiddlewareAPI } from "redux"
import { wsConnectionClosed, wsConnectionStart, wsConnectionSuccess, wsGetMessage, wsConnectionFailed, wsSendMessage, wsCloseSocketConnection } from "../webSocket/wsSlice"

export const wsMiddleware = (): Middleware => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null
    return next => action => {
      const {dispatch} = store
      const {type, payload} = action
      if(type === wsConnectionStart.type){
        socket = new WebSocket(payload)
      }
        if(socket){
          socket.onopen = (e) => {
            dispatch(wsConnectionSuccess())
          }
          socket.onerror = (e) => {
            dispatch(wsConnectionFailed(e))
          }
          socket.onmessage = (e) => {
            const { data } = e
            dispatch(wsGetMessage(JSON.parse(data)))
          }
          socket.onclose = (e) => {
            const error = e.code
            dispatch(wsConnectionClosed(error))
          }
          if(type === wsSendMessage.type){
            const message = payload
            socket.send(JSON.stringify(message))
          }
          if(type === wsCloseSocketConnection.type){
            socket.close()
          }
        }
        next(action)
      }
    }
  }
