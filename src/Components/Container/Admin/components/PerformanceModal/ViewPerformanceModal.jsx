import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { Header } from '../Header';

const ViewModal = ({ open, onClose, performance }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'white',
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
          width: 600,
        }}
      >
         <Header title="VIEW PERFORMANCE" subtitle="Here is performance Details" />
        <Typography mb={4}>Performance Of: <span style={{fontWeight:"bold"}}>{performance.employee_name}</span></Typography>
        <Typography mb={4}>Overall Score: <span style={{fontWeight:"bold"}}>{performance.score}</span></Typography>
        <Typography mb={4}>Overall Feedback On Performance: <span style={{fontWeight:"bold"}}>{performance.feedback}</span></Typography>
        <Box sx={{ mt: 3, textAlign: 'right' }}>
          <Button variant="contained" onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ViewModal;
