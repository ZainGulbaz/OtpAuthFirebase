import React from 'react'
import { Box,PinInput,PinInputField,HStack,Text } from '@chakra-ui/react'

const OtpScreen = ({setOtp}) => {
    const handlePinCompletion=(value)=>{
        setOtp(value);

    }
  return (
    <Box>
      
     <Text color={"gray.500"}>Enter the OTP send to your phone number.</Text>

     <HStack mt="2">
  <PinInput onComplete={handlePinCompletion}>
    <PinInputField />
    <PinInputField />
    <PinInputField />
    <PinInputField />
    <PinInputField />
    <PinInputField />
  </PinInput>
</HStack>
     
        </Box>
  )
}

export default OtpScreen