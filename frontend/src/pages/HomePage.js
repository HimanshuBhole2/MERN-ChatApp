import React, { useEffect } from 'react'
import { 
  Box, 
  Container,
  Text, 
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel, 
  Heading} 
  from '@chakra-ui/react'


  import Login from '../components/Authentication/Login';
  import Singup from '../components/Authentication/Singup';
import { useHistory } from 'react-router-dom';


const HomePage = () => {
  const history = useHistory();

  useEffect(()=> {
      const user = JSON.parse(localStorage.getItem("userInfo"));

      if(user) history.push("/chats");
  }, [history]);


  return (
<Container maxW="xl" centerContent >
    <Box
    d="flex"
    justifyContent="center"
    textAlign="center"
    p={4}
    bg={"white"}
    w="100%"
    m="40px 0 15px 0"
    borderRadius="5px"
    borderWidth="1px"
    >
      <Heading as='h1' fontSize="4xl" fontFamily="Work sans" color="black"> Let's Chat!!!</Heading>
      
    </Box>

  <Box
  d="flex"
  justifyContent="center"
  textAlign="center"
  p={4}
  bg={"white"}
  w="100%"
  m="40px 0 15px 0"
  borderRadius="5px"
  borderWidth="1px"
  >

    <Tabs isFitted variant='soft-rounded' >
        {/* List Here */}
        <TabList  mb='1em'>
          <Tab>LogIn</Tab>
          <Tab  _selected={{ color: 'white', bg: 'green.400' }}>SignIn</Tab>
        </TabList>
        {/* Panaels */}
      <TabPanels>

        {/* Login Methode Here */}
        <TabPanel>
          <Login></Login>
        </TabPanel>

        {/* SignIn Methode Here */}
        <TabPanel>
        <Singup></Singup>
        </TabPanel>
      </TabPanels>


    </Tabs>


  </Box>

</Container>

  )
}

export default HomePage
