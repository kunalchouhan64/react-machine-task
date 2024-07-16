import { createAsyncThunk } from "@reduxjs/toolkit"

export const FetchData = createAsyncThunk('FetchData', async (_, { rejectWithValue }) => {
    try {
        const res = await fetch('https://dummyjson.com/products?limit=100')
        if (!res.ok) {
            throw new Error('Network response was not ok')
        }
        const data = await res?.json()
        return data?.products
    } catch (error) {
        return rejectWithValue(error.message);
    }

})

