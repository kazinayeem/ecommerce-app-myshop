import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const sliderApi = createApi({
  reducerPath: "sliderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://myshop-2-production.up.railway.app/api",
  }),
  tagTypes: ["sliderApi"],
  endpoints: (builder) => ({
    getSliders: builder.query({
      query: () => "sliders",
      providesTags: ["sliderApi"],
    }),
  }),
});

export const { useGetSlidersQuery } = sliderApi;
export default sliderApi;
