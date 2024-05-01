import React, { useState } from 'react';
import {VStack} from "@chakra-ui/layout";
import {Input,InputGroup,InputRightElement} from "@chakra-ui/input";
import {FormControl,FormLabel} from "@chakra-ui/form-control";
import {Button} from "@chakra-ui/react";


const Singup=()=>{
    const [show, setShow] = useState(false);
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [confirmpassword,setConfirmpassword] = useState();
    const [password,setPassword] = useState();
    const [pic,setPic] = useState();

      const handleClick = () => setShow(!show);
    
      const postDetails = (pics)=>{ };

      const submitHandler =() =>{}

    return (
      <VStack spacing='5px'>


          <FormControl id='first-name' isRequired>
            <FormLabel >Name </FormLabel>
            <Input
            plceholder='Enter Your Name'
            onChange={(e)=> setName(e.target.value)}
            ></Input>
          </FormControl>

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


          {/* Confirm Password */}

          <FormControl id='password' isRequired>
          <FormLabel >Confirm Password </FormLabel>
            <InputGroup>
             
              <Input

              type={show? "text":'password'}
              plceholder='Confirm Your Password'
              onChange={(e)=> setConfirmpassword(e.target.value)}

              ></Input>

              <InputRightElement width="4.5 rem">
              <Button h="2.4rem" size = "sm" onClick={handleClick}>
                 {show ? "Hide": "Show"}
              </Button>
            </InputRightElement>
            </InputGroup>
          </FormControl>
           {/* Upload Pic */}
        <FormControl id='pic'>
          <FormLabel>Upload Your Picture</FormLabel>

          <Input
          type='file'
          p={1.5}
          accept='image/*'
          onChange={(e)=>postDetails(e.target.files[0])}
          ></Input>
        </FormControl>

        {/* Submit Button */}

        <Button
        colorScheme='green'
        width="100%"
        style={{marginTop:15}}
        onClick = {submitHandler}
        >
        Signup
        </Button>

      </VStack>
    )
  
}

export default Singup
