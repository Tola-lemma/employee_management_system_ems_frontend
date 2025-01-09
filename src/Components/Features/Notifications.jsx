import { apiSlice } from "../API/apiSlice";

export const notificationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch notifications (all or by employee_id)
    getNotifications: builder.query({
      query: (employee_id) =>
        employee_id ? `/notifications/${employee_id}` : "/notifications",
      transformResponse: (response) => {
        if (!response?.result) {
          throw new Error("Invalid response structure or empty result");
        }
        return response.result.map((item) => ({
          notification_id: item.notification_id,
      //     employee_id: item.employee_id,
          message: item.message,
          type: item.type,
          is_read: item.is_read,
          created_at: new Date(item.created_at).toLocaleDateString("en-US"),
          updated_at: item.updated_at
            ? new Date(item.updated_at).toLocaleDateString("en-US")
            : null,
        }));
      },
      providesTags: (result) =>
        result
          ? result.map(({ notification_id }) => ({
              type: "Notification",
              id: notification_id,
            }))
          : ["Notification"],
    }),

    // Create a new notification
    createNotification: builder.mutation({
      query: (newNotification) => ({
        url: "/notifications",
        method: "POST",
        body: newNotification,
      }),
      invalidatesTags: ["Notification"],
    }),

    // Mark a notification as read
    markNotificationAsRead: builder.mutation({
      query: (notification_id) => ({
        url: `/notifications/${notification_id}`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, notification_id) => [
        { type: "Notification", id: notification_id },
      ],
    }),

    // Delete a notification
    deleteNotification: builder.mutation({
      query: (notification_id) => ({
        url: `/notifications/${notification_id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, notification_id) => [
        { type: "Notification", id: notification_id },
      ],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useCreateNotificationMutation,
  useMarkNotificationAsReadMutation,
  useDeleteNotificationMutation,
} = notificationApiSlice;
