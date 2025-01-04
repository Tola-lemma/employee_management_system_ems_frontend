import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { Header } from '../Header';

const EditModal = ({ open, onClose, performance, onEdit }) => {
  const [formData, setFormData] = useState({
    score: performance?.score || '',
    feedback: performance?.feedback || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onEdit({ ...performance, ...formData });
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
        <Header title="EDIT PERFORMANCE" subtitle="Update score and feedback for the performance review." />
        <TextField
          label="Score"
          name="score"
          type="number"
          value={formData.score}
          onChange={handleChange}
          InputProps={{
            inputProps: { min: 0, max: 100 }, // Enforce score range 0-100
          }}
          fullWidth
          sx={{ mb: 2 }}
          required
        />
        <TextField
          label="Feedback"
          name="feedback"
          multiline
          rows={4}
          value={formData.feedback}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
          required
        />
        <Box sx={{ mt: 3, textAlign: 'right' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{ marginRight: 3 }}
          >
            Save
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditModal;
