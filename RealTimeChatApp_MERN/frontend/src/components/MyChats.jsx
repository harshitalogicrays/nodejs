import { Avatar, Box, Button, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { chatState } from '../ChatProvider'
import ChatLoading from './ChatLoading'
import { AddIcon } from '@chakra-ui/icons'
import { getSender } from './functions'
import { toast } from 'react-toastify'
import GroupChat from './GroupChat'

const MyChats = ({ fetchChat }) => {
    const {selectedChat,setSelectedChat,user,chats,setChats} = chatState()
    const [loggedInUser,setLoggedInUser] = useState()

    const fetchAllChats = async () => {
      try {
      let res =await fetch("/api/chat",{
        method:"GET",
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
     const data = await res.json()
      setChats(data);
    } catch (error) {toast.error("Failed to Load the chats")}
  }

    useEffect(()=>{
      setLoggedInUser(JSON.parse(localStorage.getItem("userInfo")))
      fetchAllChats()
    },[fetchChat])
  return (
      <Box  display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"   alignItems="center"  p={3}
      bg="white"  w={{ base: "100%", md: "32%" }} borderRadius="lg"    borderWidth="1px"
    >
      <Box pb={3}   px={3}  fontSize={{ base: "28px", md: "30px" }}
        display="flex"  w="100%" justifyContent="space-between"   alignItems="center"   >
        My Chats
        
        <GroupChat>
          <Button  display="flex" fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />} >New Group Chat </Button>
        </GroupChat>
      
      </Box>
      <Box   display="flex"   flexDir="column"  p={3}  bg="white smoke"
        w="100%"h="100%" borderRadius="lg"   overflowY="hidden" >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) =>{ 
              console.log(chat)
              let obj={}
              if(!chat.isGroupChat){obj = getSender(loggedInUser, chat.users)}
                 
              return(
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "seagreen" : "lightgray"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ?<> <Avatar size="sm" cursor="pointer" name={obj.name} src={obj.profilepic}/> {obj.name}</>
                    : chat.chatName}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            )})}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>

  )
}

export default MyChats
