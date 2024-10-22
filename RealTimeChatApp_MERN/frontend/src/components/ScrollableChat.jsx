import { Avatar, Text } from '@chakra-ui/react'
import React from 'react'
import ScrollableFeed from "react-scrollable-feed"
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from './functions'
import { chatState } from '../ChatProvider'
const ScrollableChat = ({messages}) => {
    const { user } = chatState();
  return (
    <ScrollableFeed>
    {messages &&
      messages.map((m, i) => (
        <div style={{ display: "flex" }} key={m._id}>
          {(isSameSender(messages, m, i, user._id) ||
            isLastMessage(messages, i, user._id)) && (
              <Avatar
                mt="7px"
                mr={1}
                size="sm"
                cursor="pointer"
                name={m.sender.name}
                src={m.sender.profilepic}
              />
          )}
          <span
            style={{
              backgroundColor: `${
                m.sender._id === user._id ? "lightblue" : "aquamarine"
              }`,
              marginLeft: isSameSenderMargin(messages, m, i, user._id),
              marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
              borderRadius: "20px",
              padding: "5px 15px",
              maxWidth: "75%",
            }}
          >
            {m.content}
            {m.readBy.includes(user._id) && <Text color="blue">✔</Text>}
          </span>
        </div>
      ))}
  </ScrollableFeed>
  )
}

export default ScrollableChat
