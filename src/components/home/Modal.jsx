import React, { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalHeader, Progress, Box, ModalCloseButton, ModalFooter, Button, Textarea } from "@chakra-ui/react";
import { bulkSMSApiCall } from "./Api";
import toast from "react-hot-toast";
export default function SMSModal({ isOpen, progress, setIsOpen,setProgress }) {

    const [isProgress, setIsProgress] = useState(false);
    const [message, setMessage] = useState("");
    const offSet = 30;
    let users = 30;


    const handleSMSSend = async () => {
        setIsProgress(true);
        const noOfReqAtTime = 5;
        while (true) {
            let smsPromises = [];
            for (let i = 0; i < noOfReqAtTime; i++) {
                smsPromises.push(bulkSMSApiCall(users, offSet, message));
                users = users + offSet;
                setProgress(progress+((i+1)*2));
            }
            let result = await Promise.all(smsPromises);
            if (result[noOfReqAtTime - 1].status > 399) {
                toast.error(result[noOfReqAtTime - 1].data.messages[0]);
                setIsOpen(false);
                setProgress(5);
                break;
            }
            else  {
                let shouldBrake=false;
                result?.map(res=>{
                   if(res.status==204){
                    toast.success(result[noOfReqAtTime - 1].data.messages[0]);
                    setIsOpen(false);
                    setProgress(5);
                    shouldBrake=true;
                   }
                });
            if(shouldBrake)break;
            }
        }
    }
    return (
        <>
            <Modal isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Bulk SMS</ModalHeader>
                    <ModalCloseButton onClick={() => setIsOpen(false)} />
                    <ModalBody>
                        {(isProgress) && <Box>
                            Sending the SMS in bulk. It could take some time. Please be patient....
                            <Box mt={12}>
                                <Progress hasStripe value={progress} />
                            </Box>
                        </Box>}
                        {(!isProgress) && <Box>
                            <Textarea rows={5} cols={5} onChange={(e) => setMessage(e.target.value)} />
                        </Box>}
                    </ModalBody>
                    <ModalFooter>
                        {(!isProgress) && <Button bg={"green.500"} onClick={handleSMSSend}>Send</Button>}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}