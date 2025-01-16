import React, { useState } from "react";
import { Box, Typography, Button, Modal, Grid, Paper } from "@mui/material";
import GamificationTable from "./GamificationTable";
import GamificationForm from "./GamificationForm";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { Header } from "../../components/Header";
import { useGetGamificationsQuery } from "../../../../Features/Gamification";
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';
const GamificationDashboard = () => {
  const [openForm, setOpenForm] = useState(false);
   const token = Cookies.get('token');
  const {data,refetch} = useGetGamificationsQuery()
        let role;
          try {
            if (token) {
              const decoded = jwtDecode(token);
              role = decoded.role;
            }
          } catch (error) {
            console.error("Error decoding token:", error);
          }
  const levelCounts = data?.reduce((acc, record) => {
    const level = record.level;
    const existingEntry = acc.find(item => item.level === level);
    if (existingEntry) {
      existingEntry.count += 1;
    } else {
      acc.push({ level, count: 1 });
    }
    return acc;
  }, []) || [];
  
  const COLORS = ["#4CAF50", "#2196F3", "#FF5722"];
  
  const handleOpenForm = () => {
    setOpenForm(true)
  };
  const handleCloseForm = () => {
    refetch();
    setOpenForm(false)
  };

  return (
    <Box sx={{ p: 3,margin:'20px' }}>
      <Header
           title="Gamification Dashboard"
           subtitle="Gamification can significantly improve employee engagement, motivation, and performance within an employee management system"
      />
      <Grid container spacing={3}>
        {/* Graph Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3}}>
            <Typography variant="h6" gutterBottom>
              Gamification Levels Distribution
             <span style={{fontStyle:"italic",fontWeight:"bold"}}>{` NB. points >= 1000 is termed as'Expert'
                 points >= 500 is termed as 'Intermediate'
                 else 'Beginner' `}</span> 
            </Typography>
            <PieChart width={300} height={300}>
              <Pie
                data={levelCounts}
                dataKey="count"
                nameKey="level"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {levelCounts.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </Paper>
        </Grid>

        {/* Add Gamification Button */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              Total Gamifications: {data?data?.length:17}
            </Typography>
          {(role !== "attendance_taker" && role !== "employee")&&<Button variant="contained" color="primary" onClick={handleOpenForm}>
              Add Gamification
            </Button>}
          </Paper>
        </Grid>
      </Grid>

      {/* Table Section */}
      <Box mt={4}>
        <GamificationTable />
      </Box>

      {/* Form Modal */}
      <Modal open={openForm} onClose={handleCloseForm}>
        <GamificationForm onClose={handleCloseForm} />
      </Modal>
    </Box>
  );
};

export default GamificationDashboard;
