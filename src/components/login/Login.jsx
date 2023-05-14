import React, { useState } from "react";
import { Box, Circle, Stack, Text, Button } from "@chakra-ui/react";
import PhoneNumberScreen from "./PhoneNumberScreen";
import OtpScreen from "./OtpScreen";
import { fireBaseLoginApi } from "./Api";
import toast from "react-hot-toast";

const Login = () => {
  const [activeScreens, setActiveScreens] = useState({
    phoneNumber: true,
    otp: false,
  });
  const [otp, setOtp] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [generatedOtp, setGeneratedOtp] = useState(0);
  const [btnLoading, setBtnLoading] = useState(false);
  const [disableBtn,setDisableBtn] = useState(true);

  const handleNextScreen = async (event) => {
    try {
      if (activeScreens["phoneNumber"]) {
        setBtnLoading(true);
        await fireBaseLoginApi(setGeneratedOtp, phoneNumber);
        setActiveScreens({
          phoneNumber: false,
          otp: true,
        });
      } else if (activeScreens["otp"]) {
        setBtnLoading(true);
        await generatedOtp.confirm(otp);
        toast.success("You are logged in successfully");
      }
    } catch (err) {
    
      if(err.code=="auth/code-expired"){
        toast.error("Your OTP has been expired");
      }  
      else toast.error("You are not logged in successfully");
      console.log(err);
    }
    finally{
        setBtnLoading(false);
    }
  };
  return (
    <>
    <Box w="100%"   display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}>
      <Stack
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={10}
        mt={[-100]}
        w="50%"
        p={4}
        boxShadow={"lg"}
      >
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={2}
        >
          <Circle
            borderRadius={"full"}
            w={10}
            h={10}
            bg={activeScreens["phoneNumber"] ? "red.500" : "gray.300"}
            display={"flex"}
            alignItems="center"
            justifyContent={"center"}
          >
            1
          </Circle>
          <Circle
            borderRadius={"full"}
            w={10}
            h={10}
            bg={activeScreens["otp"] ? "red.500" : "gray.300"}
            display={"flex"}
            alignItems="center"
            justifyContent={"center"}
          >
            2
          </Circle>
        </Box>
        <Text fontSize={"3xl"} fontWeight={"bold"} fontStyle={"revert-layer"}>
          {" "}
          AEEFY{" "}
        </Text>
        {activeScreens["phoneNumber"] && (
          <PhoneNumberScreen setPhoneNumber={setPhoneNumber} setDisableBtn={setDisableBtn}/>
        )}
        {activeScreens["otp"] && <OtpScreen setOtp={setOtp} />}

        {activeScreens.phoneNumber && <div id="recaptcha-container"></div>}

        <Button
          bg="red.500"
          w="20%"
          onClick={handleNextScreen}
          isLoading={btnLoading}
          mt={-4}
          isDisabled={disableBtn}
        >
          {activeScreens["phoneNumber"] ? "Next" : "Login"}
        </Button>
      </Stack>
      </Box>
    </>

  );
};

export default Login;
