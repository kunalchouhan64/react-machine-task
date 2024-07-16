import { configureStore } from "@reduxjs/toolkit";
import FetchDataSlice from "../Slices/FetchDataSlice";
import ToggleViewSlice from "../Slices/ToggleViewSlice";
// import {} from '../Slices/ToggleSlice'

const store = configureStore({
    reducer: {
        productdata: FetchDataSlice,
        toggle_view: ToggleViewSlice
    }
})

export default store;