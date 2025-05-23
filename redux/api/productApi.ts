import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://myshop-2-production.up.railway.app/api",
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ limit, page, search, categoryid, subcategoryid }) => {
        let query = `/products?limit=${limit}&page=${page}`;
        if (categoryid) {
          query += `&category=${encodeURIComponent(categoryid)}`;
        }
        if (subcategoryid) {
          query += `&subcategory=${encodeURIComponent(subcategoryid)}`;
        }
        if (search) {
          query += `&search=${search}`;
        }
        return query;
      },
      providesTags: ["Products"],
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: "Products", id }],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;
export default productApi;
