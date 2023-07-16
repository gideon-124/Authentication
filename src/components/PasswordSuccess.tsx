import React from 'react'
import { Box, Title, TextInput, Button, Flex, Anchor  } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
const PasswordSuccess = () => {  
    const navigate=useNavigate()
    const handleClick=(e:any)=>{ 
        navigate("/")
    }
  return (
    <Box style={{background:"#969696", padding:"172px, 470px", display:"flex",justifyContent:"center",alignItems:"center"}}> 
    <Flex w={500} h={600} bg={'#ffffff'}  
    justify="center"
     align="center"
     direction="column" gap={24}>  
    <Title order={3}> Password reset Link sent</Title> 
    <Button w={300} bg={"#000000"} onClick={handleClick}> Ok </Button>
    </Flex>
   </Box>
  )
}

export default PasswordSuccess