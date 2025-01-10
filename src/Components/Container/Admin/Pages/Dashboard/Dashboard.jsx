import React, { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { Box, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import StatBox from "../../components/StatBox";
import { useGetAllEmployeesQuery } from '../../../../Features/Employee';
import { Approval, Cancel, DeviceHub, Diversity2, Pending, PersonAdd, Score, Spa } from '@mui/icons-material';
import MyTreeMap from './Treemap';
import { useGetLeaveRequestsQuery } from '../../../../Features/Leave';
import { useGetPerformanceQuery } from '../../../../Features/Performance';

export const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data } = useGetAllEmployeesQuery();
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalDepartments, setTotalDepartments] = useState(0);
  const [totalManagers, setTotalManagers] = useState(0);
 const { data: leaveData, refetch } = useGetLeaveRequestsQuery();
 const { data:performanceData} = useGetPerformanceQuery();
  useEffect(() => {
    if (data && data.length > 0) {
      setTotalEmployees(data.length);
      setTotalDepartments(new Set(data.map(emp => emp.department)).size);
      setTotalManagers(data.filter(emp => emp.role === 'manager').length);
      refetch()
    }
  }, [data,refetch]);
  const leaveRequests = leaveData?.length || 0;
const approvedLeaves = leaveData?.filter(leave => leave.status === 'Approved').length || 0;
const pendingLeaves = leaveData?.filter(leave => leave.status === 'Pending').length || 0;
const rejectedLeaves = leaveData?.filter(leave => leave.status === 'Rejected').length || 0;
const [topPerformersNames, setTopPerformersNames] = useState([]);
  const [maxScore, setMaxScore] = useState(0);
// Check if performanceData exists and is an array
useEffect(() => {
  if (performanceData && performanceData.length > 0) {
    // Find the max score
    const highestScore = Math.max(...performanceData.map((item) => item.score));
    setMaxScore(highestScore);
    const topPerformers = performanceData.filter((item) => item.score === highestScore);
    const names = topPerformers.map((item) => item.employee_name); 
    setTopPerformersNames(names);
  }
}, [performanceData]);

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
            progress={totalEmployees > 0 ? (5 / totalEmployees).toFixed(2) : 0}
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
            title={totalDepartments}
            subtitle="Number of Departments"
            progress="0.7"
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
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={topPerformersNames.length > 0 ? topPerformersNames.join(", ") : "No top performer"}
            subtitle={`High Performer leaderboard maxScore : ${maxScore}`}
            progress={maxScore > 0 ? (maxScore / totalEmployees).toFixed(2) : 0}
            increase="+50%" // You can adjust this dynamically if needed
            icon={
              <Score
                sx={{ color: colors.greenAccent[300], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
        gridColumn="span 12"
        backgroundColor={colors.primary[400]}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p="20px"
      >
        <StatBox
          title={leaveRequests}
          subtitle="Leave Requests"
          progress={leaveRequests > 0 ? (leaveRequests / totalEmployees).toFixed(2) : 4}
          increase="+5%"
          icon={
            <Spa
              sx={{ color: colors.greenAccent[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title={approvedLeaves}
          subtitle="Approved Leave"
          progress={leaveRequests > 0 ? (approvedLeaves / totalEmployees).toFixed(2) : 4}
          increase="+3%"
          icon={
            <Approval
              sx={{ color: colors.greenAccent[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title={pendingLeaves}
          subtitle="Pending Leave"
          progress={pendingLeaves > 0 ? (approvedLeaves / totalEmployees).toFixed(2) : 3}
          increase="+2%"
          icon={
            <Pending
              sx={{ color: colors.greenAccent[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title={rejectedLeaves}
          subtitle="Rejected Leave"
          progress={rejectedLeaves > 0 ? (approvedLeaves / totalEmployees).toFixed(2) : 2}
          increase="+1%"
          icon={
            <Cancel
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
