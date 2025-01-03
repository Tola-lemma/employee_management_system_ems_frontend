import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { Header } from '../Header';

const ViewModal = ({ open, onClose, department }) => {
  if (!department) return null;

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
          width: 400,
        }}
      >
         <Header title="VIEW Department" subtitle="Here is Department Details" />
        <Typography>Department Name: {department.department_name}</Typography>
        <Typography>Department Head: {department.department_head || 'N/A'}</Typography>
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
