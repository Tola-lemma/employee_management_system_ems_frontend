import { apiSlice } from "../API/apiSlice";

export const leaveApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch leave requests (all or by `leave_id`)
    getLeaveRequests: builder.query({
      query: (leave_id) =>
        leave_id ? `/leave/${leave_id}` : "/leave",
      transformResponse: (response) => {
        if (!response?.result) {
          throw new Error("Invalid response structure or empty result");
        }

        // Check if a single leave or an array
        if (Array.isArray(response.result)) {
          return response.result.map((item) => ({
            leave_id: item.leave_id,
            employee_id: item.employee_id,
            name:item.employee_name,
            start_date: new Date(item.start_date).toLocaleDateString("en-US"),
            end_date: new Date(item.end_date).toLocaleDateString("en-US"),
            reason: item.reason,
            status: item.status,
            total_leave:item.total_leave, 
            remaining_leave:item.remaining_leave, 
            created_at: new Date(item.created_at).toLocaleDateString("en-US"),
          }));
        } else {
          const item = response.result;
          return {
            leave_id: item.leave_id,
            employee_id: item.employee_id,
            start_date: new Date(item.start_date).toLocaleDateString("en-US"),
            end_date: new Date(item.end_date).toLocaleDateString("en-US"),
            reason: item.reason,
            status: item.status,
            total_leave:item.total_leave, 
            remaining_leave:item.remaining_leave,
            created_at: new Date(item.created_at).toLocaleDateString("en-US"),
          };
        }
      },
      providesTags: (result, error, leave_id) =>
        leave_id
          ? [{ type: "leave", id: leave_id }]
          : ["leave"],
    }),

    // Create a new leave request
    createLeaveRequest: builder.mutation({
      query: (newLeave) => ({
        url: "/leave",
        method: "POST",
        body: newLeave,
      }),
      invalidatesTags: ["leave"],
    }),

    // Update an existing leave request
    updateLeaveRequest: builder.mutation({
      query: ({ leave_id, ...updatedData }) => ({
        url: `/leave/${leave_id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: (result, error, { leave_id }) => [
        { type: "leave", id: leave_id },
      ],
    }),

    // Delete a leave request
    deleteLeaveRequest: builder.mutation({
      query: (leave_id) => ({
        url: `/leave/${leave_id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, leave_id) => [
        { type: "leave", id: leave_id },
      ],
    }),
  }),
});

export const {
  useGetLeaveRequestsQuery,
  useCreateLeaveRequestMutation,
  useUpdateLeaveRequestMutation,
  useDeleteLeaveRequestMutation,
} = leaveApiSlice;
