import React, { useState } from 'react';
import {VStack} from "@chakra-ui/layout";
import {Input,InputGroup,InputRightElement} from "@chakra-ui/input";
import {FormControl,FormLabel} from "@chakra-ui/form-control";
import {Button} from "@chakra-ui/react";


const Login = () =>{
   

  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [show, setShow] = useState(false);
  // Event Listner 
  const handleClick = () => setShow(!show);
    
  const postDetails = (pics)=>{ };

  const submitHandler =() =>{}



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

export default Login