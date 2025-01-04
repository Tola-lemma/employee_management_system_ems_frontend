import { apiSlice } from "../API/apiSlice";

export const performanceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch performance records (all or by `performance_id`)
    getPerformance: builder.query({
      query: (performance_id) =>
        performance_id
          ? `/performance/${performance_id}`
          : "/performance",
      transformResponse: (response) => {
        if (!response?.result) {
          throw new Error("Invalid response structure or empty result");
        }

        // Check if a single performance record or an array
        if (Array.isArray(response.result)) {
          return response.result.map((item) => ({
            performance_id: item.performance_id,
            employee_name: item.employee_name,
            review_date: new Date(item.review_date).toLocaleDateString("en-US"),
            score: item.score,
            feedback: item.feedback,
          }));
        } else {
          const item = response.result;
          return {
            performance_id: item.performance_id,
            employee_id: item.employee_id,
            review_date: new Date(item.review_date).toLocaleDateString("en-US"),
            score: item.score,
            feedback: item.feedback,
          };
        }
      },
      providesTags: (result, error, performance_id) =>
        performance_id
          ? [{ type: "performance", id: performance_id }]
          : ["performance"],
    }),

    // Create a new performance record
    createPerformance: builder.mutation({
      query: (newPerformance) => ({
        url: "/performance",
        method: "POST",
        body: newPerformance,
      }),
      invalidatesTags: ["performance"],
    }),

    // Update an existing performance record
    updatePerformance: builder.mutation({
      query: ({ performance_id, ...updatedData }) => ({
        url: `/performance/${performance_id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: (result, error, { performance_id }) => [
        { type: "performance", id: performance_id },
      ],
    }),

    // Delete a performance record
    deletePerformance: builder.mutation({
      query: (performance_id) => ({
        url: `/performance/${performance_id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, performance_id) => [
        { type: "performance", id: performance_id },
      ],
    }),
  }),
});

export const {
  useGetPerformanceQuery,
  useCreatePerformanceMutation,
  useUpdatePerformanceMutation,
  useDeletePerformanceMutation,
} = performanceApiSlice;
