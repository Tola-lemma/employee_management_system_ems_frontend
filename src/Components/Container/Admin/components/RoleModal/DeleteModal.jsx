import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { Header } from '../Header';

const DeleteModal = ({ open, onClose, role, onDelete }) => {
  const handleDelete = () => {
    onDelete(role.role_id);
    onClose();
  };

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
        <Header title="DELETE ROLE" subtitle="You can Delete Role Here" />
        <Typography>
          Are you sure you want to delete the role "{role?.role_name}"?
        </Typography>
        <Box sx={{ mt: 3, textAlign: 'right' }}>
          <Button variant="contained" color="error" sx={{ mr: 1 }} onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
