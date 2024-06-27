import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import {Box} from "@chakra-ui/layout";
import { IconButton,  Spinner, Text,Input,FormControl,useToast } from "@chakra-ui/react"
import { ArrowBackIcon } from '@chakra-ui/icons'
import { getSender,getSenderFull } from '../config/ChatLogics';
// import {FormControl} from "@chakra-ui/form-control";
import ProfileModal from './miscellaneous/ProfileModal';
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal';
import { useState } from 'react';
import axios from 'axios';

const SingleChat = ({fetchAgain, setFetchAgain}) => {
    const [messages,setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState();

    
    const { user, selectedChat, setSelectedChat } = ChatState();

    const toast = useToast();

    const sendMessage = async(event) => {
        if(event === "Enter" && newMessage){
            try {
                const config = {
                    headers: {
                     "Content-Type":"application/json",
                      Authorization: `Bearer ${user.token}`
                    },
                  };

                  const { data } = await axios.post("/api/message",{
                    content: newMessage,
                    chatId: selectedChat._id,
                  },config
                    );

                console.log(data);

                setNewMessage("");
                setMessages([...messages,data])
                }
                 catch (error) {
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
    }
    const typingHandler = (e) => {
        setNewMessage(e.target.value);

        // Typing Indicator Logic
    }
  return <>{
  selectedChat ? (
    <>
        <Text
        fontSize={{base:"28px", md: "30px"}}
        pb={3}
        px={2}
        w="100%"
        fontFamily="Work sans"
        display="flex"
        justifyContent={{base: "space-between"}}
        alignItems="center"
        >
            <IconButton 
                display={{base:"flex", md:'none'}}
                icon={<ArrowBackIcon/>}
                onClick={() => setSelectedChat("")}
            />

            {!selectedChat.isGroupChat ? (
                <>
                    {getSender(user,selectedChat.users)}
                    <ProfileModal
                    user={getSenderFull(user,selectedChat.users)}
                    />
                </>
            ):(
                <>
                    {selectedChat.chatname.toUpperCase()}


                    <UpdateGroupChatModal
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                    />
                </>
            )}

        </Text>


        <Box
        display="flex"
        flexDir="column"
        justifyContent="flex-end"
        p={3}
        bg="#E8E8E8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
        >
            {/* Display Message Here */}
            {loading ? (
                <Spinner
                    size="xl"
                    w={20}
                    h={20}
                    alignSelf="center"
                    margin="auto"
                />
            ):(
                <div>{/* Messages*/}</div>
            )}

            <FormControl onKeyDown = {sendMessage} isRequired mt={3}>
            <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder='Enter a Message....'
                onChange={typingHandler}
                value={newMessage}
            />

            </FormControl>
        </Box>
    </>
  ): (
    <Box display="flex" alignItems="center" justifyContent = "center" h="100%">

        <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click On a user to start chatting
        </Text>

    </Box>
  )
  
  }</>
}

export default SingleChat
