import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    IconButton,
    Box,
    FormControl,
    Input
  } from '@chakra-ui/react';
import { Button } from '@chakra-ui/button';
import { ViewIcon } from '@chakra-ui/icons';
import { useDisclosure,useToast, Spinner } from '@chakra-ui/react';
import { ChatState } from '../../Context/ChatProvider';
import { useState } from 'react';
import UserBadgeItem from '../UserAvatar/UserBadgeItem'
import axios from 'axios';
import UserListItem from '../UserAvatar/UserListItem';
import { set } from 'mongoose';

const UpdateGroupChatModal = ({fetchAgain, setFetchAgain}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const[groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState();
    const[searchResult, setSearchResult] = useState([]);
    const[loading,setLoading] = useState(false);
    const [renameloading,setRenameLoading] = useState(false);

    const toast = useToast();

    const {selectedChat, setSelectedChat, user} = ChatState();


    const handleRemove = async(user1)=>{
      if( selectedChat.groupAdmin[0]._id !== user._id && user1._id !== user._id){
        
        toast({
          title:"Only admin Can remove someone!",
          description: "error.response.data.message",
          status:"error",
          duration:5000,
          isClosable:true,
          position:"bottom-left"
        })
        return;
      }

      try {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            },
        };
        const { data } = await axios.put(
          "/api/chat/groupremove",
          {
            chatId:selectedChat._id,
            userId:user1._id
          },
          config
        )

        user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
        setFetchAgain(!fetchAgain);
        setLoading(false);

      } catch (error){
        toast({
          title:"Only admin Can remove someone!",
          description: "error cought Here while addition",
          status:"error",
          duration:5000,
          isClosable:true,
          position:"bottom-left"
        })
        setLoading(false);
      }


    };


    const handleRename = async()=>{
        if(!groupChatName) return;
            
        try {
            setRenameLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
            };

            const {data} = await axios.put("/api/chat/rename",{
                chatId: selectedChat._id,
                chatname: groupChatName,
            },config);

            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setRenameLoading(false);
        } catch (error) {
            toast({
                title:"Error Occoured In Update chat",
                description: "error",
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom-left"
              })
              setRenameLoading(false);
              setGroupChatName("");
              console.log(error);
        }
    }

    const handleAddUser = async(user1) => {
      if(selectedChat.users.find((u) => u._id === user1._id)){
        toast({
          title:"Error Occured!",
          description: "User already Exist",
          status:"error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left"
      })
        return;
      }
      console.log(`admin ${selectedChat.chatname} curr User  ${user1.name}`);
      if(selectedChat.groupAdmin[0]._id !== user._id){

        toast({
          title:"Error Occured!",
          description: "Only addmin Cad Add Someone",
          status:"error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left"
      })
        return;
      }

      try {
        setLoading(true);

        const config = {
          headers: {
              Authorization: `Bearer ${user.token}`
          },
      };

      const {data} = await axios.put('/api/chat/groupadd',{
        chatId: selectedChat._id,
        userId: user1.id,
      },config)
      console.log(data);

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false)
      } catch (error) {
        toast({
          title:"Error Occured!",
          description: 'error cought Here while addition',
          status:"error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left"
        })
        setLoading(false);
      }
    }

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
          setLoading(false);
          setSearchResult(data);
          
      } catch (error) {
          toast({
              title:"Error Occured!",
              description: "error.response.data.message",
              status:"error",
              duration: 5000,
              isClosable: true,
              position: "bottom-left"
          })
      }
  };

    return (
      <>
        <IconButton d={{ base: "flex" }} icon={<ViewIcon/>}  onClick={onOpen}/>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedChat.chatname}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
             <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
                {selectedChat.users.map((u) => (
                    <UserBadgeItem
                            key={u._id}
                            user={u}
                            handleFunction={()=>handleRemove(u)}
                        />
                    
                ))}
             </Box>
                {/* Form Of Information fo chat  */}
                <FormControl display="flex">
                    <Input
                    placeholder='ChatName'
                    mb={3}
                    value={groupChatName}
                    onChange={(e) => setGroupChatName(e.target.value)}
                    />
                    <Button
                     variant="solid"
                     colorScheme='teal'
                     ml={1}
                     isLoading={renameloading}
                     onClick={handleRename}

                    >
                    Update
                    </Button>
                </FormControl>

                <FormControl>
                    <Input
                    placeholder='Add Use To Group'
                    mb={1}
                    onChange={(e) => handleSearch(e.target.value)}
                    />
                </FormControl>

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
                            handleFunction = {()=>handleAddUser(user)}
                        />
                    ))
                )}

            </ModalBody>
  
            <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={()=>{handleRemove(user)}} isCentered>
                Leave Group
              </Button>
              <Button colorScheme='blue' mr={3} onClick={onClose} isCentered>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}

export default UpdateGroupChatModal
