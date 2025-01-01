import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const EditModal = ({ open, onClose, data, onSave }) => {
  const [formData, setFormData] = useState(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = () => {
    onSave(formData);
    onClose(); // Close modal after saving
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: 800,
        }}
      >
        <Typography variant="h6">{`Edit Details`}</Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* Profile Image */}
          <Box>
            <img
              src={
                formData?.profile_picture ||
                "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
              }
              alt="Profile"
              style={{
                width: 150,
                height: 150,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </Box>

          {/* User Edit Form */}
          <Box>
            <TextField
              label="Full Name"
              variant="outlined"
              value={`${data?.first_name} ${data?.last_name}`}
              fullWidth
              onChange={(e) => {
                const [first_name, last_name] = e.target.value.split(" ");
                setFormData({
                  ...formData,
                  first_name,
                  last_name,
                });
              }}
            />
            <TextField
              label="Email"
              variant="outlined"
              value={data?.email}
              fullWidth
              name="email"
              onChange={handleChange}
            />
            <TextField
              label="Phone"
              variant="outlined"
              value={data?.phone}
              fullWidth
              name="phone"
              onChange={handleChange}
            />
            <TextField
              label="Address"
              variant="outlined"
              value={data?.address}
              fullWidth
              name="address"
              onChange={handleChange}
            />
            {/* Add other fields as necessary */}
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button onClick={onClose} variant="contained" color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Save Changes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditModal;
