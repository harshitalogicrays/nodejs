import { CloseIcon } from '@chakra-ui/icons'
import { Badge } from '@chakra-ui/react'
import React from 'react'

export const UserforGroupChat = ({ user, handleFunction,admin }) => {
    return (
      <Badge px={2} py={1} borderRadius="lg" m={1} mb={2}
      variant="solid" fontSize={12} colorScheme="blue"
      cursor="pointer" onClick={handleFunction}
    >
      {user.name}{" "}
      {user._id == admin._id && <> (Admin) </>}
      <CloseIcon pl={1} />
    </Badge>
    )
  }
