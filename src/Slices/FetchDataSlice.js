import { createSlice } from "@reduxjs/toolkit";
import { FetchData } from "../AsyncThunkFunctions/FetchData";

const FetchDataSlice = createSlice({
    name: 'Data',
    initialState: {
        items: [],
        isLoading: false,
        isError: false,
        status: 'idle'
    },
    reducers: {
        deletetodoreducer: (state, action) => {
            console.log("Delete Item", action.payload);
            state.items = state.items.filter((item) => item.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(FetchData.pending, (state) => {
                state.isLoading = true;
                state.status = 'Loading...';
            })
            .addCase(FetchData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
                state.status = 'Success...';
            })
            .addCase(FetchData.rejected, (state, action) => {
                state.isLoading = false; // make sure loading is false when there is an error
                state.isError = true;
                state.status = 'Failed...';
                state.isError = action.payload
            });
    }
});

export const { deletetodoreducer } = FetchDataSlice.actions;
export default FetchDataSlice.reducer;
