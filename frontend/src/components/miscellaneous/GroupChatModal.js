import { Box, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { Button  } from '@chakra-ui/button'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import {useState,} from "react"
import { useToast,Input,Spinner } from '@chakra-ui/react'
import { ChatState } from '../../Context/ChatProvider';
import { FormControl } from '@chakra-ui/form-control'
import axios from 'axios';
import  UserListItem  from "../UserAvatar/UserListItem"
import UserBadgeItem from '../UserAvatar/UserBadgeItem'










const GroupChatModal = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState();
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState();

    const toast = useToast();
    const { user, chats, setChats } = ChatState();


    const handleSearch =async (query) =>{
        setSearch(query);
        if(!query){
           return; 
        }

        try {
            setLoading(true);

            const config = {
                headers: {
                  Authorization: `Bearer ${user.token}`
                },
              };

            const {data} = await axios.get(`/api/user?search=${search}`,config);
            console.log(data);
            setLoading(false);
            setSearchResult(data);
            
        } catch (error) {
            toast({
                title:"Error Occured!",
                description: "Failed to Load the Search Results",
                status:"error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left"
            })
        }
    };
    const handleSubmit = async() =>{
        if(!groupChatName || !selectedUsers){
            toast({
                title:"Please fill all the feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        try {
            const config = {
                headers: {
                  Authorization: `Bearer ${user.token}`
                },
              };

            const {data} = await axios.post("/api/chat/group",{
            name:groupChatName,
            users: JSON.stringify(selectedUsers.map((u)=>u._id))
            },
            config );

            setChats([data,...chats]);
            onClose();
            toast({
                title:"New Group Chat Created",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

        } catch (error) {
            toast({
                title:"Falied to Creat Group Chat",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
        }
    };
    const handleGroup = (userToAdd) =>{
        if(selectedUsers.includes(userToAdd)) {
            toast({
                title:"User already added",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            })
            return;
        }

        setSelectedUsers([...selectedUsers,userToAdd]);
    };

    const handleDelete=(delUser) =>{
        setSelectedUsers(
            selectedUsers.filter((sel)=>
            sel._id !== delUser._id)
        )
    };


   return (
    <>
      <Button onClick={onOpen}>New Group Add</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
          fontSize="35px"
          fontFamily="Work sans"
          display="flex"
          justifyContent="center"
          >Create Group Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody
          display="flex" flexDir="column" alignItems="center" >
                <FormControl>
                    <Input placeholder='Chat Name' mb={3}
                    onChange={(e) => setGroupChatName(e.target.value)}
                    />
                </FormControl>

                <FormControl>
                    <Input placeholder='Add Users eg: Rocky, Himanshu, Nancy' mb={1}
                    onChange={(e) => handleSearch(e.target.value)}
                    />
                </FormControl>
                {/* selected Users */}
                <Box w="100%" display="flex" flexWrap="wrap">
                    {selectedUsers.map((u)=>(
                        <UserBadgeItem
                            key={user._id}
                            user={u}
                            handleFunction={()=>handleDelete(u)}
                        />
                    ))}
                </Box>
                {/* render Searched User */}
                {loading ? (<Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                    />
                ):(
                    searchResult?.slice(0,4).map((user)=>(
                        <UserListItem
                            key={user._id}
                            user={user}
                            handleFunction = {()=>handleGroup(user)}
                        />
                    ))
                )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' onClick={handleSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default GroupChatModal;
