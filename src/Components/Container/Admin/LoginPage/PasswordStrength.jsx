import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';

const getPasswordStrength = (password) => {
  let strength = 0;
  if (password.length >= 8) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/\d/.test(password)) strength += 1;
  if (/[@$!%*?&#]/.test(password)) strength += 1;
  return strength;
};

const PasswordStrength = ({ password }) => {
  const strength = getPasswordStrength(password);
  const strengthLabel = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong','Very Strong Password'];

  return (
    <Box sx={{ mt: 2,mb:0, width: '30%' ,backgroundColor:"rgb(237, 231, 223)",margin:'auto',textAlign:'center'}}>
      <Typography variant="subtitle2">Password Strength: <b>{strengthLabel[strength]}</b></Typography>
      <LinearProgress color="info" variant="determinate" value={(strength / 5) * 100} />
    </Box>
  );
};

export default PasswordStrength;