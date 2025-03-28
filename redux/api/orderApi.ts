import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://myshop-2-production.up.railway.app/api",
  }),
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

      invalidatesTags: (result, error, { id }) => [
        { type: "Orders", id },
        "Orders",
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
