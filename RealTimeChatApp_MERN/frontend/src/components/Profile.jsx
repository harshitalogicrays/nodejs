import { ViewIcon } from '@chakra-ui/icons'
import { Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'

const Profile = ({user,children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
    {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton display={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}
         <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg" closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent>
          <ModalHeader  fontSize="40px"   display="flex"   justifyContent="center"   >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex"  flexDir="column"   alignItems="center" justifyContent="space-between"   >
            <Image  borderRadius="full"  boxSize="150px"  src={user.profilepic}   alt={user.name}  />
            <Text fontSize={{ base: "28px", md: "30px" }}  >   Email: {user.email}  </Text>
          </ModalBody>
          <ModalFooter><Button onClick={onClose}>Close</Button>  </ModalFooter>
        </ModalContent>
        </Modal>
    </>    
)
}

export default Profile
