import React, { useState } from 'react';
import { Modal, Box, Select, MenuItem, Button, Typography } from '@mui/material';
import { Header } from '../Header';

const CreateModal = ({ open, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    role_name: '',
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
         <Header title="CREATE ROLE" subtitle="You Can Create Role Here" />
         <Typography variant="body2" color="error" mb={4} sx={{fontWeight:"bold",fontSize:13}}> Note That Currently You can Create Role in Dropdown only.</Typography>
         <Select
          label="Role Name"
          name="role_name"
          value={formData.role_name}
          onChange={handleChange}
          fullWidth
          displayEmpty
          sx={{ mb: 2 }}
        >
          <MenuItem value="" disabled>
            Select Role
          </MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="employee">Employee</MenuItem>
          <MenuItem value="manager">Manager</MenuItem>
          <MenuItem value="attendance_taker">Attendance Taker</MenuItem>
        </Select>
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
