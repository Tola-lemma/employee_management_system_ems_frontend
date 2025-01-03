import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { Header } from '../Header';

const EditModal = ({ open, onClose, department, onEdit }) => {
  const [formData, setFormData] = useState({
    department_name: department?.department_name || '',
  });
const [view, setView] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onEdit({ ...department, ...formData });
    onClose();
  };
const handleView = () => {
    setView(!view);
}
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
          width: 500,
        }}
      >
         <Header title="UPDATE DEPARTMENT" subtitle="You Can Edit Department Here" />
         {view && <Typography color='error' sx={{fontWeight:"bold",fontSize:12}} mb={3}>You cannot change department head here, please Edit/change this via Manage Employee Section. But you can Update Department name Here!.</Typography>}
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
          InputProps={{
            readOnly: true,
          }}
          onClick={handleView}
          fullWidth
        />
        <Box sx={{ mt: 3, textAlign: 'right' }}>
          <button className='btn btn-primary' style={{ marginRight: 3 }} onClick={handleSubmit}>
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
