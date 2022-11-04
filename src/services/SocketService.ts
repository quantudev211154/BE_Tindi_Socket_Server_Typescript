import { Socket } from 'socket.io'
import {
  onDisconnect,
  onFireConnection,
  onRevokeMsg,
  onSendMsg,
  onTypingMsg,
  onUpdateMsg,
} from '../controller/SocketEventController'
import { SocketEventEnum } from '../enum/SocketEventConstants'

export const handleSocketEvent = (socket: Socket) => {
  global.GL_SOCKET = socket

  socket.on(SocketEventEnum.FIRE_CONNECTION, onFireConnection)

  socket.on(SocketEventEnum.CHANGE_TYPING_STATE, onTypingMsg)

  socket.on(SocketEventEnum.SEND_MSG, onSendMsg)

  socket.on(SocketEventEnum.DISCONNECT, onDisconnect)

  socket.on(SocketEventEnum.SEND_REVOKE_MSG_CMD, onRevokeMsg)

  socket.on(SocketEventEnum.SEND_UPDATE_MSG_CMD, onUpdateMsg)
}
