import { Avatar, Box, Button,Menu,MenuButton,MenuDivider,MenuItem,MenuList,Text } from '@chakra-ui/react'
import React from 'react'
import {FaSearch} from 'react-icons/fa'
import {BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { chatState } from '../ChatProvider'
const ChatHeader = () => {
  const {user}=chatState()
  return (
   <Box   display="flex" justifyContent="space-between" alignItems="center"
   bg="white" w="100%" p="5px 10px 5px 10px" borderWidth="5px">
    <Button variant='ghost' >
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
                <MenuItem>My Profile</MenuItem>
              <MenuDivider />
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
   </Box>
  )
}

export default ChatHeader
