import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_SERVER_PORT }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (userId) => `orders/user/${userId}`,
      providesTags: (result, error, userId) =>
        result ? [{ type: "Orders", id: userId }] : [],
    }),

    getordersById: builder.query({
      query: (id) => `orders/${id}`,
      providesTags: (result, error, id) => [{ type: "Orders", id }],
    }),

    addorders: builder.mutation({
      query: (neworders) => ({
        url: "orders",
        method: "POST",
        body: neworders,
      }),
      invalidatesTags: ["Orders"],
    }),

    updateorders: builder.mutation({
      query: ({ id, ...updatedorders }) => ({
        url: `orders/${id}`,
        method: "PUT",
        body: updatedorders,
      }),
      // Invalidate the updated order and refetch the list of orders
      invalidatesTags: (result, error, { id }) => [
        { type: "Orders", id }, // Invalidate the specific updated order
        "Orders", // Invalidate the list of orders so it's refetched
      ],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetordersByIdQuery,
  useAddordersMutation,
  useUpdateordersMutation,
} = ordersApi;

export default ordersApi;
