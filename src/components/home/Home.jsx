import React,{useEffect,useState} from 'react';
import { Box,Text,Button } from '@chakra-ui/react';
import DataTable from 'react-data-table-component';
import { getRegisteredUsers } from './Api';
import toast from "react-hot-toast";
import SMSModal from './Modal';

const Home = () => {
  
  const [users,setUsers]=useState([]);
  const [progressPending, setProgressPending]=useState(true);
  const[isOpenModal,setIsOpenModal]=useState(false);
  const [progress,setProgress]=useState(5);

useEffect(()=>{
  getRegisteredUsers().then(res=>{
    if(res.status!==400)
    {
    setUsers(res.data.data);
    
    }
    else{
toast.error(res.data.messages[0]);
    }
    setProgressPending(false);
  }).catch(err=>{
    toast.error(err.message);
    setProgressPending(false);
  });
},[])

const handleSmsBtn=()=>{
  setIsOpenModal(!isOpenModal);
}

  return (
    <Box p={4}>
<Button bg="red.500" color="gray.800" onClick={handleSmsBtn}>Send Bulk Messages</Button>
      <DataTable
        columns={[{name:"UUID", selector:"uid"},{ name: "Phone Number", selector: "phoneNumber" },{
          name:"Creation Date", selector:"metadata.creationTime"
        },{name:"Last Sign Time", selector:"metadata.lastSignInTime"}]}
        title="Authenticated Users"
        data={users}
        highlightOnHover
        pagination
        responsive={true}
        onChangeRowsPerPage={10}
        progressPending={progressPending}
      />
      <SMSModal isOpen={isOpenModal} setIsOpen={setIsOpenModal} progress={progress} setProgress={setProgress}/>
    </Box>
  )
}

export default Home;