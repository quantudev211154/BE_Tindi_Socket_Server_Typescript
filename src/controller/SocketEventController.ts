import { SocketEventEnum } from '../enum/SocketEventConstants'
import { FireConnectionPayloadType } from '../types/FireConnectionPayloadType'
import { SendFriendInvitationPayloadType } from '../types/SendFriendInvitationPayloadType'
import { SendMsgPayloadType } from '../types/SendMsgPayloadType'
import { TypingPayloadType } from '../types/TypingPayloadType'
import { checkExistingUserSocket } from '../utils/CheckExistingUserSocket'
import { DisconnectPayloadType } from '../types/DisconnectPayloadType'
import { RevokeMsgType } from '../types/RevokeMsgType'

export const onFireConnection = ({ userId }: FireConnectionPayloadType) => {
  GL_ONLINE_USERS.set(userId, GL_SOCKET.id)
  console.log('NEW USER: ' + userId + ' - ' + GL_SOCKET.id)
}

export const onTypingMsg = ({
  conversationId,
  currentUserId,
  targetUserId,
  isTyping,
}: TypingPayloadType) => {
  const targetUserSocket = GL_ONLINE_USERS.get(targetUserId)

  if (targetUserSocket)
    GL_IO.to(targetUserSocket as string).emit(
      SocketEventEnum.CHANGE_TYPING_STATE,
      { conversationId, currentUserId, targetUserId, isTyping }
    )
}

export const onSendMsg = (data: any) => {
  const targetUserSocket = GL_ONLINE_USERS.get(data.to.id)
  console.log(
    `NEW MSG: [${data.message.message}, TO: ${data.to.id} - ${targetUserSocket}]`
  )

  if (targetUserSocket) {
    GL_IO.to(targetUserSocket as string).emit(SocketEventEnum.RECEIVE_MSG, data)
  }
}

export const onDisconnect = ({ userId }: DisconnectPayloadType) => {
  GL_ONLINE_USERS.delete(userId)
}

export const onRevokeMsg = ({
  conversation,
  message,
  targetUserId,
}: RevokeMsgType) => {
  const targetUserSocket = GL_ONLINE_USERS.get(targetUserId)

  if (targetUserSocket) {
    GL_IO.to(targetUserSocket as string).emit(SocketEventEnum.REVOKE_MSG, {
      conversation,
      message,
      targetUserId,
    })
  }
}

export const onUpdateMsg = (data: any) => {
  console.log(data)
  const targetUserSocket = GL_ONLINE_USERS.get(data.to.id)

  if (targetUserSocket) {
    GL_IO.to(targetUserSocket as string).emit(SocketEventEnum.UPDATE_MSG, data)
  }
}
