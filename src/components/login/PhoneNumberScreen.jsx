import React, { useState } from "react";
import { Box, Input, InputGroup, Text, Stack } from "@chakra-ui/react";
import { isValidPhoneNumber } from "react-phone-number-input";

const PhoneNumberScreen = ({ setPhoneNumber, setDisableBtn }) => {
  const [isValid, SetIsValid] = useState(true);

  const hanldePhoneChange = (event) => {
    if (isValidPhoneNumber(event.target.value)) {
      setPhoneNumber(event.target.value);
      SetIsValid(true);
      setDisableBtn(false);
    } else {
      SetIsValid(false);
      setDisableBtn(true);
    }
  };
  return (
    <Box>
      <Text color={"gray.500"}>Enter your phone number to login</Text>
      <Box mt="2">
        <InputGroup>
          <Stack>
            <Input
              type="tel"
              placeholder="Phone Number"
              onChange={hanldePhoneChange}
            />
            {!isValid && (
              <Text color="red.800" fontSize={"smaller"}>
                The phonenumber is invalid
              </Text>
            )}
          </Stack>
        </InputGroup>
      </Box>
    </Box>
  );
};

export default PhoneNumberScreen;
