import { apiSlice } from "../API/apiSlice";

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch tasks (all or by `task_id`)
    getTasks: builder.query({
      query: (task_id) =>
        task_id ? `/tasks/${task_id}` : "/tasks",
      transformResponse: (response) => {
        if (!response?.result) {
          throw new Error("Invalid response structure or empty result");
        }

        // Check if a single task or an array
        if (Array.isArray(response.result)) {
          return response.result.map((item) => ({
            task_id: item.task_id,
            employee_id: item.employee_id,
            task_description: item.task_description,
            due_date: new Date(item.due_date).toLocaleDateString("en-US"),
            status: item.status,
          }));
        } else {
          const item = response.result;
          return {
            task_id: item.task_id,
            employee_id: item.employee_id,
            task_description: item.task_description,
            due_date: new Date(item.due_date).toLocaleDateString("en-US"),
            status: item.status,
          };
        }
      },
      providesTags: (result, error, task_id) =>
        task_id
          ? [{ type: "task", id: task_id }]
          : ["task"],
    }),

    // Create a new task
    createTask: builder.mutation({
      query: (newTask) => ({
        url: "/tasks",
        method: "POST",
        body: newTask,
      }),
      invalidatesTags: ["task"],
    }),

    // Update an existing task
    updateTask: builder.mutation({
      query: ({ task_id, ...updatedData }) => ({
        url: `/tasks/${task_id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: (result, error, { task_id }) => [
        { type: "task", id: task_id },
      ],
    }),

    // Delete a task
    deleteTask: builder.mutation({
      query: (task_id) => ({
        url: `/tasks/${task_id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, task_id) => [
        { type: "task", id: task_id },
      ],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApiSlice;
