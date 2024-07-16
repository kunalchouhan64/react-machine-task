import { createSlice } from "@reduxjs/toolkit";

const ToggleViewSlice = createSlice({
    name: 'toggleview',
    initialState: {
        view: 'Card View'
    },
    reducers: {
        ToggleViewReducer: (state) => {
            // state.view = (state.view === 'Card_View') ? 
            // if (state.view === 'Card_View') {
            //     state.view = 'List_View'
            // } else {
            //     state.view = 'Card_View'
            // }

            state.view = state.view === 'Card View' ? state.view = 'List View' : state.view = 'Card View'
        },
    }
})

export const { ToggleViewReducer } = ToggleViewSlice.actions
export default ToggleViewSlice.reducer