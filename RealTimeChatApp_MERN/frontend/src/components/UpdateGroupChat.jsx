import { Box, Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { chatState } from '../ChatProvider'
import { UserforGroupChat } from './UserforGroupChat'
import UserListItem from './UserListItem'
import { toast } from 'react-toastify'

const UpdateGroupChat = ({fetchMessages, fetchChat, setFetchChat,children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
   
    const [groupChatName, setGroupChatName] = useState(children)
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [renameloading, setRenameLoading] = useState(false)

    const { selectedChat, setSelectedChat, user } = chatState()

    // console.log(selectedChat)

    const handleSearch = async (query) => {
        setSearch(query); if (!query) {return}  
        try {
          setLoading(true);
          const res = await fetch(`/api?search=${search}`,{
            method:"GET", headers: {Authorization: `Bearer ${user.token}`}
          })
          const data = await res.json()
          setLoading(false)
          setSearchResult(data)
        } catch (error) {toast.error("Failed to Load the Search Results")}
      };

      const handleRename = async () => {
        if (!groupChatName) return;
    
        try {
          setRenameLoading(true);
          const res = await fetch(`/api/chat/renamegroup`,{
            method:"PUT",
            headers: {Authorization: `Bearer ${user.token}`,
            'content-type':'application/json'},
            body:JSON.stringify( {
                chatId: selectedChat._id,
                chatName: groupChatName,
              })
          })
          const data =  await res.json()
          console.log(data);
          setSelectedChat(data);
          setGroupChatName(data.chatName)
          setFetchChat(!fetchChat);
          setRenameLoading(false);
          onClose()
        } catch (error) { toast.error(error.message)
          setRenameLoading(false);
        }
      };

      const handleAddUser = async (user1) => {
        if (selectedChat.users.find((u) => u._id === user1._id)) {
            toast.error("User Already in group!")
            return;
        }
    
        if (selectedChat.groupAdmin._id !== user._id) {
            toast.error("Only admins can add someone!")
          return;
        }
    
        try {
          setLoading(true);
          const res= await fetch(`/api/chat/addtogroup`,{
            method:"PUT",
            headers: {'content-type':'application/json',
                Authorization: `Bearer ${user.token}`
              },
              body:JSON.stringify( {
                chatId: selectedChat._id,
                userId: user1._id,
              })
          })

          const data= await res.json()
          setSelectedChat(data);
          setFetchChat(!fetchChat);
          setSearchResult([])
          setSearch('')
        //   onClose()
          setLoading(false);
        } catch (error) { toast.error(error.message);setLoading(false);
        }
         };
  
         const handleRemove = async (user1) => {
            if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
                toast.error("Only admins can remove someone!")}
                else {
                    try {
                        setLoading(true);
                        const res =  await fetch( `/api/chat/removefromgroup`,{
                          method:'PUT',
                          headers: {'content-type':'application/json',
                              Authorization: `Bearer ${user.token}`
                            },
                            body:JSON.stringify( {
                              chatId: selectedChat._id,
                              userId: user1._id,
                            })
                        })
                        const data = await res.json()
                        user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
                        setFetchChat(!fetchChat);
                        fetchMessages();
                        setLoading(false);
                      } catch (error) { toast.error(error.message);setLoading(false);
                      }
                }
            
          };
    
 
  return (
    <>
    <span onClick={onOpen}>{children}</span>
    <Modal onClose={onClose} isOpen={isOpen} isCentered closeOnOverlayClick={false}>
       <ModalOverlay />
       <ModalContent>
         <ModalHeader
           fontSize="35px"
           fontFamily="Work sans"
           d="flex"
           justifyContent="center"
         >
           {selectedChat.chatName}
         </ModalHeader>

         <ModalCloseButton />
         <ModalBody d="flex" flexDir="column" alignItems="center">
           <Box w="100%" d="flex" flexWrap="wrap" pb={3}>
             {selectedChat.users.map((u) => (
               <UserforGroupChat
                 key={u._id}
                 user={u}
                 admin={selectedChat.groupAdmin}
                 handleFunction={() => handleRemove(u)}
               />
             ))}
           </Box>
           <FormControl d="flex">
             <Input
               placeholder="Chat Name"
               mb={1}
               value={groupChatName}
               onChange={(e) => setGroupChatName(e.target.value)}
             />
             <Button
               variant="solid"
               colorScheme="teal"
               ml={1} my={3}
               isLoading={renameloading}
               onClick={handleRename}
             >
               Update
             </Button>
           </FormControl>
           <FormControl>
             <Input
               placeholder="Add User to group"
               mb={1}
               onChange={(e) => handleSearch(e.target.value)}
             />
           </FormControl>

           {loading ? (
             <Spinner size="lg" />
           ) : (
             searchResult?.slice(0,2).map((user) => (
               <UserListItem
                 key={user._id}
                 user={user}
                 handleFunction={() => handleAddUser(user)}
               />
             ))
           )}
         </ModalBody>
         <ModalFooter>
           <Button onClick={() => handleRemove(user)} colorScheme="red">
             Leave Group
           </Button>
         </ModalFooter>
       </ModalContent>
     </Modal>
   </>
   
  )
}

export default UpdateGroupChat
