import React, { useEffect, useState } from 'react'
import { chatState } from '../ChatProvider'
import { Box, Flex, IconButton, Input, Spinner, Text } from '@chakra-ui/react'
import { getSender } from './functions'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import Profile from './Profile'
import UpdateGroupChat from './UpdateGroupChat'
import ScrollableChat from './ScrollableChat'
import { toast } from 'react-toastify'

const SingleChat = ({fetchChat,setFetchChat}) => {
  const { selectedChat, setSelectedChat, user, notification, setNotification } =chatState()
  const [loading,setLoading] =useState(false)
  const [newMessage,setNewMessage]=useState('')
  const [messages,setMessages]=useState([])

  const typingHandler=(e)=>{ setNewMessage(e.target.value)}
  const sendMessage=async()=>{
    try{
      setNewMessage("")
      const res=  await fetch("/api/message",{
        method:"POST",  headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`
        },
        body:JSON.stringify( {
          content: newMessage,
          chatId: selectedChat,
        })
      })
      const data=await res.json()
      setMessages([...messages, data]);
    }
    catch(err){toast.error(err)}  
    }
  const fetchMessages=async()=>{
    if (!selectedChat) return;
  try {
    const res = await fetch( `/api/message/${selectedChat._id}`,{
      method:"GET", headers: {Authorization: `Bearer ${user.token}`},
    })
    const data = await res.json()
    console.log(data)
    setMessages(data)
    setLoading(false)
  } catch (error) { toast.error("Failed to Load the Messages")}
  }
    
useEffect(() => {
  fetchMessages();
}, [selectedChat]);
  return (
    <>
     {selectedChat ?<>
      <Text fontSize={{ base: "28px", md: "30px" }}  px={2}
            w="100%" display="flex" justifyContent={{ base: "space-between",md:'center' }}
            alignItems="center" cursor='pointer'>
            <IconButton display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />} onClick={() => setSelectedChat("")}/>
              {!selectedChat.isGroupChat ? 
              <>  
                <Profile user={getSender(user, selectedChat.users)}>{getSender(user, selectedChat.users).name}</Profile>              </> : 
              <> 
              <UpdateGroupChat
                    fetchMessages={fetchMessages}
                    fetchChat={fetchChat}                
                    setFetchChat={setFetchChat}>{selectedChat.chatName}</UpdateGroupChat>
              </>
              }
</Text>
  <Box display="flex" flexDir="column" justifyContent="flex-end"
              p={3} bg="lightgray" w="100%" h="100%" borderRadius="lg" overflowY="hidden">
              {loading ? (
                <Spinner size="xl" w={20} h={20} alignSelf="center" margin="auto"/>) : 
                (
                <div className="messages">
                  <ScrollableChat messages={messages} />
                  <Flex align="center" gap={2} p={2}>
                  <Input
                    variant="filled"
                    bg="#E0E0E0"
                    placeholder="Enter a message.."
                    value={newMessage}
                    onChange={typingHandler}
                  />
                  <IconButton
                    aria-label="Send Message"
                    icon={<ArrowForwardIcon />}
                    colorScheme="blue"
                    onClick={sendMessage}
                    variant="solid"
                  />
              </Flex>
                </div>
              )}
  </Box>

     </>:
      <Box display="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3}>
            Chat Loading.....
          </Text>
        </Box>
      }
    </>
  )
}

export default SingleChat
