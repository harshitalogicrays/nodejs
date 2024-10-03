import React from 'react'
import { chatState } from '../ChatProvider'
import { Box } from '@chakra-ui/react'

const ChatBox = ({fetchChat,setFetchChat}) => {
    const {selectedChat}=chatState()
  return (
  <Box>
        chat
  </Box>
  )
}

export default ChatBox
