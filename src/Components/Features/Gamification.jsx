import { apiSlice } from "../API/apiSlice";
import Cookies from 'js-cookie';

export const gamificationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch gamifications (all or by `gamification_id`)
    getGamifications: builder.query({
      query: (gamification_id) => ({
        url: gamification_id
          ? `/gamifications/${gamification_id}`
          : "/gamifications",
        headers: {
          'x-auth-token': Cookies.get('token') || '',
        },
      }),
      transformResponse: (response) => {
        if (!response?.result) {
          throw new Error("Invalid response structure or empty result");
        }

        // Check if a single record or an array
        if (Array.isArray(response.result)) {
          return response.result.map((item) => ({
            gamification_id: item.gamification_id,
            employee_name: item.employee_name,
            points: item.points,
            level: item.level,
            streak: item.streak || 0,
            badges: item.badges || [],
            last_active: new Date(item.last_active).toLocaleDateString("en-US"),
          }));
        } else {
          const item = response.result;
          return {
            gamification_id: item.gamification_id,
            employee_name: item.employee_name,
            points: item.points,
            level: item.level,
            streak: item.streak || 0,
            badges: item.badges || [],
            last_active: new Date(item.last_active).toLocaleDateString("en-US"),
          };
        }
      },
      providesTags: (result, error, gamification_id) =>
        gamification_id
          ? [{ type: "gamification", id: gamification_id }]
          : ["gamification"],
    }),

    // Create a new gamification record
    createGamification: builder.mutation({
      query: (newGamification) => ({
        url: "/gamifications",
        method: "POST",
        body: newGamification,
        headers: {
          'x-auth-token': Cookies.get('token') || '',
        },
      }),
      invalidatesTags: ["gamification"],
    }),

    // Update an existing gamification record
    updateGamification: builder.mutation({
      query: ({ gamification_id, ...updatedData }) => ({
        url: `/gamifications/${gamification_id}`,
        method: "PUT",
        body: updatedData,
        headers: {
          'x-auth-token': Cookies.get('token') || '',
        },
      }),
      invalidatesTags: (result, error, { gamification_id }) => [
        { type: "gamification", id: gamification_id },
      ],
    }),

    // Delete a gamification record
    deleteGamification: builder.mutation({
      query: (gamification_id) => ({
        url: `/gamifications/${gamification_id}`,
        method: "DELETE",
        headers: {
          'x-auth-token': Cookies.get('token') || '',
        },
      }),
      invalidatesTags: (result, error, gamification_id) => [
        { type: "gamification", id: gamification_id },
      ],
    }),
  }),
});

export const {
  useGetGamificationsQuery,
  useCreateGamificationMutation,
  useUpdateGamificationMutation,
  useDeleteGamificationMutation,
} = gamificationApiSlice;
