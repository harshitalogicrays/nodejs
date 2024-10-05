import React, { useState } from 'react'
import { chatState } from '../ChatProvider'
import ChatHeader from '../components/ChatHeader'
import { Box } from '@chakra-ui/react'
import MyChats from '../components/MyChats'
import ChatBox from '../components/ChatBox'

const ChatPage = () => {
    const {user} = chatState()
    const [fetchChat,setFetchChat]=useState()
   return (
    <div style={{ width: "100%" }}>
      {user && <ChatHeader/>}
      <Box display="flex" justifyContent="space-between" w='100%' h='91vh' p='10px'>
        {user && <MyChats fetchChat={fetchChat}/>}
        {user && <ChatBox fetchChat={fetchChat}
        setFetchChat={setFetchChat}
        />}
      </Box>
    </div>
  )
}

export default ChatPage
