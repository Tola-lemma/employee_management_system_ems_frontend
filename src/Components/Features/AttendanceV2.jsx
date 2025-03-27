import { apiSlice } from "../API/apiSlice";
import Cookies from 'js-cookie';

export const attendanceV2ApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all offices
    getAllOffices: builder.query({
      query: () => ({
        url: "/officies",
        headers: {
          'x-auth-token': Cookies.get('token') || ''
        },
      }),
      transformResponse: (response) => {
        if (!response?.result || !Array.isArray(response.result)) {
          throw new Error("Invalid response structure or empty result");
        }
        return response.result.map((item) => ({
          office_id: item.office_id,
          name: item.name,
          latitude: item.latitude,
          longitude: item.longitude,
          radius: item.radius,
        }));
      },
      providesTags: ["offices"],
    }),

    // Create office
    createOffice: builder.mutation({
      query: (newOffice) => ({
        url: "/officies",
        method: "POST",
        body: newOffice,
        headers: {
          'x-auth-token': Cookies.get('token') || ''
        },
      }),
      invalidatesTags: [{ type: "offices", id: "LIST" }],
    }),

    // Update office
    updateOffice: builder.mutation({
      query: ({ office_id, ...updatedData }) => ({
        url: `/officies/${office_id}`,
        method: "PUT",
        body: updatedData,
        headers: {
          'x-auth-token': Cookies.get('token') || ''
        },
      }),
      invalidatesTags: (result, error, { office_id }) => [
        { type: "offices", id: office_id },
      ],
    }),

    // Employee Check-in
    checkIn: builder.mutation({
      query: (data) => ({
        url: "/attendance/checkin",
        method: "POST",
        body: data,
        headers: {
          'x-auth-token': Cookies.get('token') || ''
        },
      }),
      invalidatesTags: ["attendance"],
    }),

    // Employee Check-out
    checkOut: builder.mutation({
      query: (data) => ({
        url: "/attendance/checkout",
        method: "POST",
        body: data,
        headers: {
          'x-auth-token': Cookies.get('token') || ''
        },
      }),
      invalidatesTags: ["attendance"],
    }),

    // Get all attendance records
    getAllAttendanceRecords: builder.query({
      query: () => ({
        url: "/attendance/v2/getall",
        headers: {
          'x-auth-token': Cookies.get('token') || ''
        },
      }),
      transformResponse: (response) => {
        if (!response?.records) {
          throw new Error("Invalid response structure or empty result");
        }
        if (Array.isArray(response?.records)){
        return response.records.map((item) => ({
          employee_id: item.employee_id,
          first_name: item.first_name,
          last_name: item.last_name,
          office_name: item.office_name,
          check_in: item.check_in,
          check_out: item.check_out,
          status: item.status,
          is_checked_in:item.is_checked_in,
          extra_hours: item.extra_hours,
          total_work_hours_today: item.total_work_hours_today,
          total_work_hours_week: item.total_work_hours_week,
          extra_hours_today: item.extra_hours_today,
          extra_hours_week: item.extra_hours_week,
        }));
      }
      },
      providesTags: ["attendance"],
    }),
    // Get all attendance records
    getAttendanceRecordsByEmployeeId: builder.query({
      query: ({employee_id}) => ({
        url: `/attendance/v2/${employee_id}`,
        headers: {
          'x-auth-token': Cookies.get('token') || ''
        },
      }),
      transformResponse: (response) => {
        if (!response?.records) {
          throw new Error("Invalid response structure or empty result");
        }
        if (Array.isArray(response?.records)){
        return response.records.map((item) => ({
          employee_id: item.employee_id,
          first_name: item.first_name,
          last_name: item.last_name,
          office_name: item.office_name,
          check_in: item.check_in,
          check_out: item.check_out,
          status: item.status,
          is_checked_in:item.is_checked_in,
          extra_hours: item.extra_hours,
          total_work_hours_today: item.total_work_hours_today,
          total_work_hours_week: item.total_work_hours_week,
          extra_hours_today: item.extra_hours_today,
          extra_hours_week: item.extra_hours_week,
        }));
      }
      },
      providesTags: ["attendance"],
    }),
  }),
});

export const {
  useGetAllOfficesQuery,
  useCreateOfficeMutation,
  useUpdateOfficeMutation,
  useCheckInMutation,
  useCheckOutMutation,
  useGetAllAttendanceRecordsQuery,
  useGetAttendanceRecordsByEmployeeIdQuery
} = attendanceV2ApiSlice;
