import { BUSINESSES_URL, UPLOADS_URL } from '../constans.js';
import { apiSlice } from './apiSlice.js';

export const businessesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBusinesses: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: BUSINESSES_URL,
        params: {
          pageNumber,
          keyword,
        },
      }),
      providesTags: ['Business'],
      keepUnusedDataFor: 5
    }),
    getBusinessDetails: builder.query({
      query: (businessId) => ({
        url: `${BUSINESSES_URL}/${businessId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${BUSINESSES_URL}/${data.businessId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Business'],
    }),
    getMyReview: builder.query({
      query: () => ({
        url: `${BUSINESSES_URL}/profile/myreviews`,
      }),
      keepUnusedDataFor: 5,
    }),
    getReviews: builder.query({
      query: () => ({
        url: `${BUSINESSES_URL}/reviews`,
      }),
      keepUnusedDataFor: 5,
    }),
    createBusiness: builder.mutation({
      query: () => ({
        url: BUSINESSES_URL,
        method: 'POST',
      }),
      invalidatesTags: ['Business'],
    }),
    updateBusiness: builder.mutation({
      query: (data) => ({
        url: `${BUSINESSES_URL}/${data.businessId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Business'],
    }),
    uploadBusinessImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOADS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteBusiness: builder.mutation({
      query: (businessId) => ({
        url: `${BUSINESSES_URL}/${businessId}`,
        method: 'DELETE',
      }),
    }),
    getTopBusinesses: builder.query({
      query: () => ({
        url: `${BUSINESSES_URL}/top`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { 
  useGetBusinessesQuery, 
  useGetBusinessDetailsQuery, 
  useCreateReviewMutation, 
  useGetMyReviewQuery, 
  useGetReviewsQuery, 
  useCreateBusinessMutation, 
  useUpdateBusinessMutation,
  useUploadBusinessImageMutation,
  useDeleteBusinessMutation,
  useGetTopBusinessesQuery,
} = businessesApiSlice;