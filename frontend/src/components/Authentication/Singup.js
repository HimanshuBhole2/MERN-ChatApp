import React, { useState } from 'react';
import {VStack} from "@chakra-ui/layout";
import {Input,InputGroup,InputRightElement} from "@chakra-ui/input";
import {FormControl,FormLabel} from "@chakra-ui/form-control";
import {Button, position} from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react'
import {useNavigate} from "react-router-dom"
import axios  from 'axios';

const Singup=()=>{
    const [show, setShow] = useState(false);
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [confirmpassword,setConfirmpassword] = useState();
    const [loading,setLoading] = useState(false);
    const [password,setPassword] = useState();
    const [pic,setPic] = useState();
    const toast = useToast()

    const navigate = useNavigate();

      const handleClick = () => setShow(!show);
    // Uploading of images
      const postDetails = async(pics)=>{ 
        setLoading(true);
        if(pics === undefined){
          toast({
            title: 'Please Select An Image',
            description: "Image is Not Selected,Please Select An Image",
            status: 'warning',
            duration: 9000,
            isClosable: true,
            position: "bottom",
          });
          setLoading(false);

          return;
        }

        if(pics.type === "image/jpeg" || pics.type=="image/png" || pics.type=="image/jpg"){
          const data = new FormData();
          data.append("file",pics);
          data.append("upload_preset","chat-app");
          data.append("cloud_name","dovxt5sgb");
          await fetch("https://api.cloudinary.com/v1_1/dovxt5sgb/image/upload",{
            method: "post",
            body: data,
          }).then((res)=>res.json())
            .then(async (data)=>{
             await setPic(data.url.toString());
              toast({
                title: 'Image Upload Successful',
                description: "Congrajulation!!! Image Upload Successfully!!!",
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: "bottom",
              })
              setLoading(false);

            }).catch((err)=>{
              console.log(err);
              setLoading(false);
            })
        }else{
          toast({
            title: 'Image Upload Failed',
            description: "Image Upload Get Failed Upload Image only Jpg,Jpeg and png Please Try again",
            status: 'warning',
            duration: 9000,
            isClosable: true,
            position: "bottom",
          });
          setLoading(false);
        }
      };

      // Submit details
      const submitHandler =async() =>{
        setLoading(true);
        if(!name || !email || !password || !confirmpassword){
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

        // Password Password
         if(password !== confirmpassword){
          toast({
            title: 'Password Not Matching!!',
            description: "Please Check Password Again!!",
            status: 'warning',
            duration: 9000,
            isClosable: true,
            position: "top",
          });
          setLoading(false)
          return;
         }

         try{
          const config = {
            headers:{
              "Content-type":"application/json",
            },
          };
          const {data} = await axios.post("/api/user",{name,email,password,pic},
            config
          );
          toast({
            title: 'Registration Done Successfully',
            description: "Congrajulation!!! Registration Successfully !!!",
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: "bottom",
          })

          localStorage.setItem("userInfo",JSON.stringify(data));
          setLoading(false);
          navigate("/chats")
         } catch(error){
          toast({
            title: 'Image Upload Successful',
            description: error.response.data.message,
            status: 'warning',
            duration: 9000,
            isClosable: true,
            position: "bottom",
          })
         }
        
        }

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
        isLoading = {loading}
        >
        Signup
        </Button>

      </VStack>
    )
  
}

export default Singup
