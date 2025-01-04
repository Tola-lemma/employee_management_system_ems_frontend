import { apiSlice } from "../API/apiSlice";

export const notificationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch notifications (all or by `notification_id`)
    getNotifications: builder.query({
      query: (notification_id) =>
        notification_id ? `/notifications/${notification_id}` : "/notifications",
      transformResponse: (response) => {
        if (!response?.result) {
          throw new Error("Invalid response structure or empty result");
        }

        // Check if a single notification or an array
        if (Array.isArray(response.result)) {
          return response.result.map((item) => ({
            notification_id: item.notification_id,
            employee_id: item.employee_id,
            message: item.message,
            type: item.type,
            is_read: item.is_read,
          }));
        } else {
          const item = response.result;
          return {
            notification_id: item.notification_id,
            employee_id: item.employee_id,
            message: item.message,
            type: item.type,
            is_read: item.is_read,
          };
        }
      },
      providesTags: (result, error, notification_id) =>
        notification_id
          ? [{ type: "notification", id: notification_id }]
          : ["notification"],
    }),

    // Create a new notification
    createNotification: builder.mutation({
      query: (newNotification) => ({
        url: "/notifications",
        method: "POST",
        body: newNotification,
      }),
      invalidatesTags: ["notification"],
    }),

    // Mark notification as read
    markNotificationAsRead: builder.mutation({
      query: ({ notification_id }) => ({
        url: `/notifications/${notification_id}`,
        method: "PUT",
        body: { is_read: true },
      }),
      invalidatesTags: (result, error, { notification_id }) => [
        { type: "notification", id: notification_id },
      ],
    }),

    // Delete a notification
    deleteNotification: builder.mutation({
      query: (notification_id) => ({
        url: `/notifications/${notification_id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, notification_id) => [
        { type: "notification", id: notification_id },
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
