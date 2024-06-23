import React, { useEffect } from 'react'
import { ChatState } from '../Context/ChatProvider'
import { useToast } from '@chakra-ui/react';
import { Box,Stack, Text } from '@chakra-ui/layout';
import {Button} from "@chakra-ui/button"
import {useState} from "react";
import axios from 'axios';
import { AddIcon } from '@chakra-ui/icons';
import ChatLoading from './ChatLoading'
import { getSender } from '../config/ChatLogics';
import GroupChatModal from "./miscellaneous/GroupChatModal.js";
 

const MyChats = ({ fetchAgain }) => {
  const [loggedUser,setLoggedUser] = useState();
  const {user,selectedChat, setSelectedChat, chats, setChats} = ChatState();

  const toast = useToast();

  const fetchChats = async() =>{
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        },
      };

      const {data} = await axios.get("/api/chat",config);
      setChats(data);

    } catch (error) {
       toast({
          title:"Error Occoured",
          description: "error",
          status:"error",
          duration:5000,
          isClosable:true,
          position:"bottom-left"
        })
    }
  }

  useEffect(() => {
      setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
      fetchChats();
  },[fetchAgain])

  return (
    <Box
    display={{ base: selectedChat? "none":"flex", md: "flex"}}
        flexDir="column"
        alignItems="center"
        p={3}
        bg="white"
        h="100%"
        w={{base:"100%", md: "31%"}}
        borderRedious="lg"
        borderWidth="1px"
    >
      <Box
      pb={3}
      px={3}
      fontSize={{base: "280x", md: "30px"}}
      display={"flex"}
      w="100%"
      justifyContent="space-between"
      alignItems="center"
      >
        My Chats
          <GroupChatModal>

            <Button
            
            fontSize={{base: "17px", md:"10px", lg: "17px"}}
            rightIcon={<AddIcon/>}
            >
              New Group Add
            </Button>

          </GroupChatModal>
      </Box>  
      <Box
      display={"flex"} flexDir="column" p={3} bg="#F8F8F8" w="100%" h="90%" borderRadius="lg" overflow="hidden"
      >
      {chats ? (
        <Stack overflowY="scroll">
          {chats.map((chat)=>(
            <Box
              onClick={() => setSelectedChat(chat)} cursor="pointer" bg={selectedChat === chat ? "#38B2AC":"#E8E8E8"}
              color={selectedChat === chat ? "white": "black"} px={3} py={2} borderRadius="lg" key={chat._id}
            >
                <Text>
                  {!chat.isGroupChat?getSender(loggedUser,chat.users) : chat.chatname}
                </Text>
            </Box>
          ))
          }
        </Stack>
      ):(
        <ChatLoading/>
      )}
      </Box>
    </Box>
  )
}

export default MyChats
