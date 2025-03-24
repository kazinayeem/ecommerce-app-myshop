import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://myshop-2-production.up.railway.app/api",
  }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "categories",
    }),
    getCategoryById: builder.query({
      query: (id) => `categories/${id}`,
    }),
  }),
});

export const { useGetCategoriesQuery, useGetCategoryByIdQuery } = categoryApi;

export default categoryApi;
