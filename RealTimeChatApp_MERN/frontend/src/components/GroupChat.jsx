import { Box, Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react'
import { chatState } from '../ChatProvider';
import UserListItem from './UserListItem';
import ChatLoading from './ChatLoading';
import { toast } from 'react-toastify';
import { UserforGroupChat } from './UserforGroupChat';

const GroupChat = ({children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user, chats, setChats } = chatState();

    const handleSearch = async (query) => {
      setSearch(query);
      if (!query) {return;}
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

    const handleGroup = (user) => {
      console.log(user)
      if (selectedUsers.includes(user)) toast.warning("user already added")
     else setSelectedUsers([...selectedUsers, user]);
    };

    const handleRemove=(user)=>{
      setSelectedUsers(selectedUsers.filter((sel) => sel._id !== user._id));
    }

    const handleSubmit = async () => {
      if (!groupChatName || !selectedUsers) {toast.warning("please fill all the fields")}
      else {
        try {
          const res= await fetch(`/api/chat/creategroup`,{
            method:"POST", headers: {'content-type':'application/json',
              Authorization: `Bearer ${user.token}`
            },
            body:JSON.stringify({
              name: groupChatName,
              users: JSON.stringify(selectedUsers.map((u) => u._id)),
            })
          })
          const data = await res.json()
          setChats([data, ...chats])
          setSelectedUsers([])
          onClose()
          toast.success("New Group Chat Created!")
         } catch (error) { toast.error("Failed to Create the Chat!")
        }
      }
      setSearchResult([])
      setSearch('')
    }
  return (
        <>
      <span onClick={onOpen}>{children}</span>

      <Modal onClose={onClose} isOpen={isOpen} isCentered closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="35px" display="flex" justifyContent="center">Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <FormControl>
              <Input placeholder="Chat Name"  mb={3} onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input placeholder="Add Users" mb={1} onChange={(e) => handleSearch(e.target.value)}
              /> </FormControl>
            <Box w="100%" d="flex" flexWrap="wrap">
            {selectedUsers.map((user)=><UserforGroupChat key={user._id}
             user={user} handleFunction={()=>handleRemove(user)}/>)}
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.slice(0,2).map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme="blue">Create Chat  </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default GroupChat
