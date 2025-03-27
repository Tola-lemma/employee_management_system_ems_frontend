import { useState, useEffect, useContext } from "react";
import { IconButton, Typography, Container,useTheme, CircularProgress, Box, LinearProgress } from "@mui/material";
import { CheckCircleOutline, HighlightOff } from "@mui/icons-material";
import { useCheckInMutation, useCheckOutMutation, useGetAttendanceRecordsByEmployeeIdQuery } from "../../../../Features/AttendanceV2";
import { ErrorContext } from "../../ToastErrorPage/ErrorContext";
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { Header } from "../../components/Header";
import { tokens } from "../../theme";
const AttendanceV2 = () => {
  const [location, setLocation] = useState(null);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentWorkHours, setCurrentWorkHours] = useState("0:00");
  const { showSuccess, showError } = useContext(ErrorContext);
  const [progress, setProgress] = useState(0);
  const [checkIn] = useCheckInMutation();
  const [checkOut] = useCheckOutMutation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const token = Cookies.get('token');
  let employee_id;
  try {
    if (token) {
      const decoded = jwtDecode(token);
      employee_id = decoded.employee_id;
    }
  } catch (error) {
    console.error("Error decoding token:", error);
  }

  const { data } = useGetAttendanceRecordsByEmployeeIdQuery({ employee_id });
  // console.log('dataa',data)
  const formatWorkHours = (hours) => {
    const h = Math.floor(hours); // Get the integer part (hours)
    const m = Math.round((hours - h) * 60); // Get the decimal part (minutes)
    return `${h}:${m < 10 ? '0' + m : m}`; // Return in hr:min format
  };
  useEffect(() => {
    if (data && data.length > 0) {
      setIsCheckedIn(data[0].is_checked_in);
    }
  }, [data]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        },
        (error) => showError("Error fetching location: " + error),
        { enableHighAccuracy: true }
      );
    }
  }, [showError]);
// console.log("locccccc",location)
  useEffect(() => {
    if (isCheckedIn) {
      const interval = setInterval(() => {
        const checkInTime = new Date(data?.[0]?.check_in);
        const now = new Date();
        const diffMs = now - checkInTime;
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        setCurrentWorkHours(`${hours}:${minutes < 10 ? '0' + minutes : minutes}`);
      }, 1000);
      return () => clearInterval(interval);
    }
    if (!isCheckedIn) {
    setCurrentWorkHours(data?.[0]?.total_work_hours_today ? formatWorkHours(data[0].total_work_hours_today) : "0:00")
    }
  }, [isCheckedIn, data]);

  const handleToggleAttendance = async () => {
    if (!location) {
      showError("Location data is not available. Please enable GPS.");
      return;
    }
    setLoading(true);
    try {
      const response = isCheckedIn
        ? await checkOut({ employee_id:employee_id }).unwrap()
        : await checkIn({ employee_id, ...location }).unwrap();
      showSuccess(response.message);
      // console.log("ress",response)
      setIsCheckedIn(!isCheckedIn);
    } catch (error) {
    console.log("errr",error)
      showError("Failed to update attendance. " + error?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (data && data.length > 0) {
      const latestRecord = data[0];
      setIsCheckedIn(latestRecord.is_checked_in);

      if (latestRecord.is_checked_in && latestRecord.check_in) {
        const checkInTime = new Date(latestRecord.check_in).getTime();
        const now = new Date().getTime();
        const workDuration = 7 * 60 * 60 * 1000; // 8 hours - 1 hour lunch = 7 hours

        let elapsed = now - checkInTime;

        // Convert timestamps to hours (0-23 format)
        const checkInHour = new Date(checkInTime).getHours();
        const currentHour = new Date(now).getHours();

        // If the check-in is before lunch and the current time is after lunch, subtract 1 hour
        if (checkInHour < 12 && currentHour >= 13) {
          elapsed -= 60 * 60 * 1000; // Subtract 1 hour
        }

        let calculatedProgress = (elapsed / workDuration) * 100;
        calculatedProgress = Math.min(calculatedProgress, 100);
        setProgress(calculatedProgress);
      } else {
        setProgress(0);
      }
    }
  }, [data]);

  const totalWorkHoursWeekFormatted = data?.[0]?.total_work_hours_week ? formatWorkHours(data[0].total_work_hours_week) : "0:00";
  return (
    <Container sx={{ textAlign: "center", mt: 3 }}>
      <Header title="Attendance System V2" subtitle="Geo-fence based Attendance System" />
       {/* Work Hours */}
       <Typography variant="h4" sx={{ mt: 2, fontWeight: "bold" }}>
       Today's Work Hours: {currentWorkHours}
     </Typography>
     <Typography variant="h4" sx={{ mt: 1 ,fontWeight:"bold"}}>
       This Week's Work Hours:   {totalWorkHoursWeekFormatted}
     </Typography>
      {/* Time Slots */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
        <Box sx={{ backgroundColor: `${colors.primary[400]}`, p: 2, borderRadius: 2, boxShadow: 1 }}>
          <Typography variant="h6">Morning Shift</Typography>
          <Typography variant="h6">8:00 AM - 12:00 AM</Typography>
        </Box>
        <Box sx={{ backgroundColor: `${colors.primary[400]}`, p: 2, borderRadius: 2, boxShadow: 1 }}>
        <Typography variant="h6">Afternoon Shift</Typography>
          <Typography variant="h6">1:00 PM - 5:00 PM</Typography>
        </Box>
      </Box>
      
      <Box sx={{ mt: 3, width: "50%", mx: "auto" }}>
        <LinearProgress variant="determinate" value={progress} sx={{ height: 25, borderRadius: 5, bgcolor: progress > 100 ? `${colors.redAccent[400]}` : `${colors.primary[13]}` }} />
        <Typography variant="body2" sx={{ mt: 1 }}>
          Work Progress: {Math.round(progress)}%
        </Typography>
      </Box>

      <IconButton onClick={handleToggleAttendance} color={isCheckedIn ? "success" : "error"} sx={{ fontSize: 100, mt: 3 }} disabled={loading}>
        {loading ? <CircularProgress size={100} /> : isCheckedIn ? <CheckCircleOutline fontSize="inherit" /> : <HighlightOff fontSize="inherit" />}
      </IconButton>
      
      <Typography variant="h3" sx={{ mt: 2 }}>
        {isCheckedIn ? "Checked In. Click to Check Out." : "Checked Out. Click to Check In."}
      </Typography>
    </Container>
  );
};

export default AttendanceV2;
