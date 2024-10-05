import { Avatar, Box, Button,Drawer,DrawerBody,DrawerContent,DrawerHeader,DrawerOverlay,Input,Menu,MenuButton,MenuDivider,MenuItem,MenuList,Spinner,Text, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import {FaSearch} from 'react-icons/fa'
import {BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { chatState } from '../ChatProvider'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import Profile from './Profile'
import ChatLoading from './ChatLoading'
import UserListItem from './UserListItem'
const ChatHeader = () => {
  let [search,setSearch]=useState('')
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);


  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate=useNavigate()
  const {setSelectedChat,user,notification,setNotification,chats,setChats} = chatState();

  const handleLogout=()=>{
    localStorage.removeItem("userInfo")
    toast.success("loggedOut successfully")
    navigate("/")
  }

  const handleSearch = async () => {
    if (!search) { toast.warning("Please Enter something in search");return}
    try {
      setLoading(true);
      let res = await fetch(`/api?search=${search}`,{
        method:"GET",headers: {Authorization: `Bearer ${user.token}`}
      })
      const data=await res.json()
      setLoading(false);
      setSearchResult(data);
    } catch (error) {toast.error( "Failed to Load the Search Results");setLoading(false)}
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      let res = await fetch(`/api/chat`,{
        method:"POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body:JSON.stringify({ userId })
      })
      const data=await res.json()
      console.log(data)
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) { toast.error(error.message)
        setLoadingChat(false)
    }
  };

  return (
    <>
   <Box   display="flex" justifyContent="space-between" alignItems="center"
   bg="white" w="100%" p="5px 10px 5px 10px" borderWidth="5px">
    <Button variant='ghost' onClick={onOpen}>
        <FaSearch/>
        <Text display={{ base: "none", md: "flex" }} mt={4} px={4}>search here</Text>
    </Button>
    <Text fontSize="2xl">Chat App</Text>
        <div>
          <Menu >
            <MenuButton>
              <BellIcon boxSize={6} />
            </MenuButton>
          </Menu>
          <Menu >
            <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
              <Avatar size="sm" cursor="pointer" name={user.name} src={user.profilepic}/>
            </MenuButton>
            <MenuList>
              <Profile user={user}>
                <MenuItem>My Profile</MenuItem>
              </Profile>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
   </Box>

   <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input placeholder="Search by name or email" mr={2} value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>

   </>
  )
}

export default ChatHeader
