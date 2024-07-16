import { useSelector } from "react-redux";

export const view_toggle = useSelector((state) => state.toggle_view.view)
export const items = useSelector((state) => state?.productdata?.items);
export const isLoading = useSelector((state) => state?.productdata?.isLoading);
export const isError = useSelector((state) => state?.productdata?.isError);