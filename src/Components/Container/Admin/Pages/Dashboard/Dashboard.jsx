import React, { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { Box, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import StatBox from "../../components/StatBox";
import { useGetAllEmployeesQuery } from '../../../../Features/Employee';
import { DeviceHub, Diversity2, PersonAdd, PointOfSale } from '@mui/icons-material';
import MyTreeMap from './Treemap';

export const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data } = useGetAllEmployeesQuery();
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [presentEmployees, setPresentEmployees] = useState(4);
  const [totalDepartments, setTotalDepartments] = useState(0);
  const [totalManagers, setTotalManagers] = useState(0);

  useEffect(() => {
    if (data && data.length > 0) {
      setTotalEmployees(data.length);
      // setPresentEmployees(data.filter(emp => emp.status === 'present').length); 
      setTotalDepartments(new Set(data.map(emp => emp.department)).size);
      setTotalManagers(data.filter(emp => emp.role === 'manager').length);
    }
  }, [data]);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalEmployees}
            subtitle="Number of Employees"
            progress={totalEmployees > 0 ? (presentEmployees / totalEmployees).toFixed(2) : 0}
            increase="+70%"
            icon={
              <Diversity2
                sx={{ color: colors.greenAccent[300], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={presentEmployees}
            subtitle="Employees Present"
            progress={presentEmployees > 0 ? (presentEmployees / totalEmployees).toFixed(2) : 4}
            increase="+5%" 
            icon={
              <PointOfSale
                sx={{ color: colors.greenAccent[300], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalDepartments}
            subtitle="Number of Departments"
            progress="1.0"
            increase="+10%" 
            icon={
              <DeviceHub
                sx={{ color: colors.greenAccent[300], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalManagers}
            subtitle="Number of Managers"
            progress={totalManagers > 0 ? (totalManagers / totalEmployees).toFixed(2) : 0}
            increase="+15%"
            icon={
              <PersonAdd
                sx={{ color: colors.greenAccent[300], fontSize: "26px" }}
              />
            }
          />
        </Box>
      </Box>
      <MyTreeMap employees={data}/>
    </Box>
  );
};
