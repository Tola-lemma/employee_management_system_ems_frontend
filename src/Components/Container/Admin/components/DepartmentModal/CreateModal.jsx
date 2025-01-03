import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import { Header } from '../Header';

const CreateModal = ({ open, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    department_name: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onCreate({ ...formData });
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
         <Header title="CREATE DEPARTMENT" subtitle="You Can Create Department Here" />
        <TextField
          label="Department Name"
          name="department_name"
          value={formData.department_name}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Box sx={{ mt: 3, textAlign: 'right' }}>
          <button className='btn btn-primary' style={{ marginRight: 3 }} onClick={handleSubmit}>
            Create
          </button>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateModal;
