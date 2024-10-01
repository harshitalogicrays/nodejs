import { Box, Button,Text } from '@chakra-ui/react'
import React from 'react'
import {FaSearch} from 'react-icons/fa'
const ChatHeader = () => {
  return (
   <Box d="flex" justifyContent="space-between" alignItems="center" bg="white"
   w="100%" p="5px" borderWidth="5px">

    <Button variant='ghost'>
        <FaSearch/>
        <Text mt="8px" d="flex">search here</Text>
    </Button>
    <Text d="inline">Chat App</Text>
  
   </Box>
  )
}

export default ChatHeader
