import { apiSlice } from "../API/apiSlice";

export const attendanceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch attendance records (all or by `attendance_id`)
    getAttendance: builder.query({
      query: (attendance_id) =>
        attendance_id
          ? `/attendance/${attendance_id}`
          : "/attendance",
      transformResponse: (response) => {
        if (!response?.result) {
          throw new Error("Invalid response structure or empty result");
        }

        // Check if a single attendance record or an array
        if (Array.isArray(response.result)) {
          return response.result.map((item) => ({
            attendance_id: item.attendance_id,
            employee_id: item.employee_id,
            date: new Date(item.date).toLocaleDateString("en-US"),
            status: item.status,
            check_in_time: item.check_in_time,
            check_out_time: item.check_out_time,
          }));
        } else {
          const item = response.result;
          return {
            attendance_id: item.attendance_id,
            employee_id: item.employee_id,
            date: new Date(item.date).toLocaleDateString("en-US"),
            status: item.status,
            check_in_time: item.check_in_time,
            check_out_time: item.check_out_time,
          };
        }
      },
      providesTags: (result, error, attendance_id) =>
        attendance_id
          ? [{ type: "attendance", id: attendance_id }]
          : ["attendance"],
    }),

    // Create a new attendance record
    createAttendance: builder.mutation({
      query: (newAttendance) => ({
        url: "/attendance",
        method: "POST",
        body: newAttendance,
      }),
      invalidatesTags: ["attendance"],
    }),

    // Update an existing attendance record
    updateAttendance: builder.mutation({
      query: ({ attendance_id, ...updatedData }) => ({
        url: `/attendance/${attendance_id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: (result, error, { attendance_id }) => [
        { type: "attendance", id: attendance_id },
      ],
    }),

    // Delete an attendance record
    deleteAttendance: builder.mutation({
      query: (attendance_id) => ({
        url: `/attendance/${attendance_id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, attendance_id) => [
        { type: "attendance", id: attendance_id },
      ],
    }),
  }),
});

export const {
  useGetAttendanceQuery,
  useCreateAttendanceMutation,
  useUpdateAttendanceMutation,
  useDeleteAttendanceMutation,
} = attendanceApiSlice;
