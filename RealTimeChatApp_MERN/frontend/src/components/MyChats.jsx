import { Box, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { chatState } from '../ChatProvider'
import ChatLoading from './ChatLoading'

const MyChats = () => {
    const {selectedChat,setSelectedChat,user,chats,setChats} = chatState()
    const [loggedInUser,setLoggedInUser] = useState()
  return (
    <div>
      <Box display={{base:selectedChat ? 'none':'flex',md:'flex'}} p={2} flexDir="column"
      alignItems="center" bg="white" w={{base:'100%',md:'30%'}} borderWidth={1}>
        <Box pb={3} px={3} fontSize={{base:'30px',md:'20px'}} display="flex" w="100%"
        justifyContent="space-between" alignItems="center">
            My Chats</Box>
            <Box display="flex" flexDir="column" p={3}
            w="100%" h="100%" borderRadius="lg" overflowY="hidden">  
                {chats.length!=0 ? 
                    <Stack overflowY="scroll">
                        {chats.map((chat,i)=>
                            <Box bg="lightskyblue">
                                <Text>user</Text>
                            </Box>
                        )}
                    </Stack>
                :<ChatLoading/>
                }
            
        </Box>
      </Box>
    </div>
  )
}

export default MyChats
