import React, { useEffect, useState } from 'react'
import { chatState } from '../ChatProvider'
import { Box, Flex, IconButton, Input, Spinner, Text } from '@chakra-ui/react'
import { getSender } from './functions'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import Profile from './Profile'
import UpdateGroupChat from './UpdateGroupChat'
import ScrollableChat from './ScrollableChat'
import { toast } from 'react-toastify'
import io from 'socket.io-client'
let socket, selectedChatCompare

const SingleChat = ({fetchChat,setFetchChat}) => {
  const { selectedChat, setSelectedChat, user, notification, setNotification } =chatState()
  const [loading,setLoading] =useState(false)
  const [newMessage,setNewMessage]=useState('')
  const [messages,setMessages]=useState([])

  const [socketConnected, setSocketConnected] = useState(false)
  const [typing, setTyping] = useState(false)
  const [istyping, setIsTyping] = useState(false)

  useEffect(() => {
    socket = io("http://localhost:4000");
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on('message received', (newMessageReceived) => {
        if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
            // Notification logic
            if (!notification.includes(newMessageReceived)) {
                setNotification([newMessageReceived, ...notification]);
                setFetchChat(!fetchChat);
            }
        } else {
            // Update the messages state directly
            setMessages((prevMessages) => [...prevMessages, newMessageReceived]);

            // Emit read event for the message

            socket.emit("messageRead", { messageId: newMessageReceived._id, userId: user._id });
        }
    });

    // Listen for messageRead events to update the UI
    socket.on('messageRead', ({ messageId, userId }) => {
        setMessages((prevMessages) => 
            prevMessages.map((msg) => 
                msg._id === messageId ? { ...msg, readBy: [...msg.readBy, userId] } : msg
            )
        );
    });

    return () => {
      socket.off("connected");
        socket.off("message received");
        socket.off("messageRead");
    };
}, [messages, notification]);


  const typingHandler=(e)=>{ setNewMessage(e.target.value)
    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);}
    let lastTypingTime = new Date().getTime();
    let timerLength = 3000;
    setTimeout(() => {
       let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);

  };  



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
      socket.emit('new message',data)
      socket.emit("messageRead", { messageId:data._id, userId: user._id });
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
    // console.log(data)
    setMessages(data)
    setLoading(false)
    socket.emit('join chat',selectedChat._id)
  } catch (error) { toast.error("Failed to Load the Messages")}
  }
    

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
                  </div>
                )}
                  {istyping ? (
                    <div class="typing">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  ) : (
                    <></>
                  )}
                  <Flex align="center" gap={2} p={2} mt={2}> 
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
