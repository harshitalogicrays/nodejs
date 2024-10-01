import React from 'react'
import { chatState } from '../ChatProvider'
import ChatHeader from '../components/ChatHeader'
import { Box } from '@chakra-ui/react'

const ChatPage = () => {
    const {user} = chatState()
   return (
    <div>
      {user && <ChatHeader/>}
      <Box d="flex" justifyContent="space-between" w='100%' h='91vh' p='10px'>
        {user && "mychats"}
        {user && "chatBox"}
      </Box>
    </div>
  )
}

export default ChatPage
