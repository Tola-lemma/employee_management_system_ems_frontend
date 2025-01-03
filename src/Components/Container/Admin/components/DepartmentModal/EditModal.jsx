import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import { Header } from '../Header';

const EditModal = ({ open, onClose, department, onEdit }) => {
  const [formData, setFormData] = useState({
    department_name: department?.department_name || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onEdit({ ...department, ...formData });
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
         <Header title="UPDATE DEPARTMENT" subtitle="You Can Edit Department Here" />
        <TextField
          label="Department Name"
          name="department_name"
          value={formData.department_name}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Department Head"
          name="department_head"
          value={department?.department_head}
          aria-readonly={true}
          fullWidth
        />
        <Box sx={{ mt: 3, textAlign: 'right' }}>
          <button className='btn btn-primary' style={{ mr: 1 }} onClick={handleSubmit}>
            Save
          </button>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditModal;
