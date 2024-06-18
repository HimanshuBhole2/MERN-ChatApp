import { Box } from '@chakra-ui/layout';
import { Tooltip, Text, Menu, MenuButton, Avatar, MenuList, MenuItem, Input, useToast } from '@chakra-ui/react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/spinner';


import {useDisclosure} from "@chakra-ui/hooks";
import { Button  } from '@chakra-ui/button';
import {useState} from "react";
import React from 'react';
import {BellIcon, ChevronDownIcon} from "@chakra-ui/icons";
import {ChatState} from '../../Context/ChatProvider';
import ProfileModal from './ProfileModal';
import ChatLoading from '../ChatLoading';
import UserListItem from '../UserAvatar/UserListItem';
import { useHistory } from 'react-router-dom';
import axios from 'axios';




const SideDrawer = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading,setLoading] = useState(false);
    const [loadingChat,setLoadingChat] = useState();

    const {user, setSelectedChat,chats,setChats} = ChatState();
    const history = useHistory();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const logoutHandler = () =>{
      localStorage.removeItem("userInfo");
      history.push("/");
    }

    const handleSearch = async() => {
        if(!search) {
          toast({
            title:"Please Enter something in search",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position:"top-left"
          });
          return;
        }

        try{
          setLoading(true);

          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          }

          const {data} = await axios.get(`/api/user?search=${search}`,config)
          setLoading(false);
          setSearchResult(data);

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
    };


    const accessChat = async (userid) => {
      try {
        setLoadingChat(true);

        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`
          },
        }

        const {data} = await axios.post('/api/chat',{userid},config)
        if(!chats.find((c) => c._id === data._id)) setChats([data, ...chats]); 

        setSelectedChat(data);
        setLoadingChat(false);
        onClose();

      } catch (error) {
        toast({
          title:"Here Is Error Occoured",
          description: "error",
          status:"error",
          duration:5000,
          isClosable:true,
          position:"bottom-left"
        })
        console.log(error)
        return;

      }
    };


    
  return (
    <>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search Users to Chat" hasArrow placement="bottom-end">

            <Button variant="ghost" onClick={onOpen}>
            <i class="fas fa-search"></i>
                <Text d={{base: "none", md:"flex"}} px='4'>
                    Search User
                </Text>
            </Button>
        </Tooltip>

        <Text fontSize="2xl" fontFamily="Work sans">
            Talk-A-Tive
        </Text>

        <div>
            <Menu>
                <MenuButton p={1}>
                    <BellIcon fontSize="2xl" m={1} />
                </MenuButton>
            </Menu>

            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
                <Avatar size="sm" cursor="pointer" name={user.name}
                src={user.pic}
                />
                </MenuButton>

                <MenuList>
                  <ProfileModal user = {user}>
                  <MenuItem>My Profile</MenuItem>
                  </ProfileModal>
                    
                    <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </MenuList>
            </Menu>
        </div>
      </Box>

      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />

          <DrawerContent>
            <DrawerHeader borderBOttomWidth="1px">Search Users</DrawerHeader> 

            <DrawerBody>
            <Box display={"flex"} pb = {2}>
                <Input
                placeholder="Search By Name Or Email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />

                <Button
                 onClick={handleSearch}
                 >Go</Button>
            </Box>
          {loading ? (
              <ChatLoading />
            ) : (
               searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={()=>accessChat(user._id)}
                />
               ))
              )}

              {loadingChat && <Spinner ml="auto" display={"flex"}  position="top-left"/>}

          </DrawerBody>


          </DrawerContent>

          
      </Drawer>
    </>
  )
}

export default SideDrawer
