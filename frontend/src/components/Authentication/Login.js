import React, { useState } from 'react';
import {VStack} from "@chakra-ui/layout";
import {Input,InputGroup,InputRightElement} from "@chakra-ui/input";
import {FormControl,FormLabel} from "@chakra-ui/form-control";
import {Button} from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react'
import {useHistory} from "react-router-dom"
import axios  from 'axios';

const Login = () =>{
   

  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [show, setShow] = useState(false);
  const [loading,setLoading] = useState(false);

  const toast = useToast()

  const history = useHistory();
  // Event Listner 
  const handleClick = () => setShow(!show);
    
  const postDetails = (pics)=>{ };

  const submitHandler =async() =>{
    setLoading(true);
    if(!email || !password){
      toast({
        title: 'Any Field Is Missing',
        description: "Any Of the Feild is Missing, Please Check Again",
        status: 'warning',
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
  }
  try{
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
  
    const {data} = await axios.post(
      "/api/user/login",
      {email, password},
      config
    );

    // console.log(Josn.stingify(data))

    toast({
      title: 'SuccessFully Logged In',
      description: "Successfully LoggedIn",
      status: 'success',
      duration: 9000,
      isClosable: true,
      position: "top",
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
    setLoading(false);
    history.push("/chats");
  } catch (error) {
    toast({
      title: "Error Occoured",
      description: "Any Of the Feild is Missing, Please Check Again",
      status: 'warning',
      duration: 9000,
      isClosable: true,
      position: "top",
    });
    setLoading(false);
  }

  

 
  }



  return(
    <VStack spacing='5px'>


         {/* Email Put */}
          <FormControl id='email' isRequired>
            <FormLabel >Email </FormLabel>
            <Input
            plceholder='Enter Your Email'
            onChange={(e)=> setEmail(e.target.value)}
            ></Input>


          </FormControl>
          <FormControl id='password' isRequired>
          <FormLabel >Password </FormLabel>
            <InputGroup>
             
              <Input

              type={show? "text":'password'}
              plceholder='Type Your Password'
              onChange={(e)=> setPassword(e.target.value)}

              ></Input>

              <InputRightElement width="4.5 rem">
              <Button h="2.4rem" size = "sm" onClick={handleClick}>
                 {show ? "Hide": "Show"}
              </Button>
            </InputRightElement>
            </InputGroup>
          </FormControl>

        {/* Submit Button */}

        <Button
        colorScheme='blue'
        width="100%"
        style={{marginTop:15}}
        onClick = {submitHandler}
        isLoading={loading}
        >
        LogIn
        </Button>

        <Button
        colorScheme='red'
        width="100%"
        style={{marginTop:15}}
        onClick = {()=>{
          setEmail("guest@example.com");
          setPassword("123456");
        }}
        >
        Get Guest User Credential
        </Button>

      </VStack>
  )
  
}

export default Login;
