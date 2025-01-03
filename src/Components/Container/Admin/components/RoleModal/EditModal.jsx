import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { Header } from '../Header';

const EditModal = ({ open, onClose, role, onEdit }) => {
  const [formData, setFormData] = useState({
    role_name: role?.role_name || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onEdit({ ...role, ...formData });
    onClose();
  };
  const handleFieldClick = () => {
    alert('Currently, editing this field is not possible.');
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
         <Header title="UPDATE ROLE" subtitle="Sorry Currently You are not able to Edit role, Please Contact Administrator." />
         <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          Note that editing the role name is currently not allowed.
        </Typography>
        <TextField
          label="role Name"
          name="role_name"
          value={formData.role_name}
          onChange={handleChange}
          InputProps={{
            readOnly: true,
          }}
          onClick={handleFieldClick}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Box sx={{ mt: 3, textAlign: 'right' }}>
          <button disabled className='btn btn-primary' style={{ marginRight: 3 }} onClick={handleSubmit}>
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
