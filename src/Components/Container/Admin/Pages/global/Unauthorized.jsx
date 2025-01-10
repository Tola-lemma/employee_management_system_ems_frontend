import { Box, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';

const Unauthorized = () => {
      const navigate = useNavigate()
  return (
    <Box m={"20px"} >
       <Header title="Unauthorized" subtitle="You do not have permission to view this page." /> 
      <Typography component={"a"}sx={{cursor:"pointer"}} onClick={()=>navigate('/home')}>Go back to Dashboard</Typography>
    </Box>
  );
};

export default Unauthorized;
