import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { RootState } from "@/lib/store"; // Pastikan Anda memiliki file store.ts atau sesuaikan dengan nama file store Anda

interface IData {
    role: "customers" | "eo";
    username: string;
    email: string; // Tambahkan field email
    token: string;

}

const data: IData = {
    token: "",
    username: "",
    email: "", // Inisialisasi email kosong
    role: "customers" || "eo",

};

const userSlice = createSlice({
    name: "user",
    initialState: { ...data },
    reducers: {
        setSuccessLogin: (state, action) => {

            // Menyimpan data ke local storage
            const { token, username, email, role } = action.payload;
            if (role === "customers") {
                Cookies.set("Token Cust", token);
            } else if (role === "eo") {
                Cookies.set("Token EO", token);
            }
            return { ...state, token, username, email, role };
        },
        setLogout: () => {
            Cookies.remove("Token Cust");
            Cookies.remove("Token EO");
            return { ...data };
        },
    },
});

const actions = {
    setSuccessLoginAction: userSlice.actions.setSuccessLogin,
    setLogoutAction: userSlice.actions.setLogout,
};
export const { setSuccessLoginAction, setLogoutAction } = actions;

export const selectUserRole = (state: RootState) => state.userSlice.role;
export const selectUserEmail = (state: RootState) => state.userSlice.email
// export const selectUserisActive = (state: RootState) => state.userSlice.isActive

// Selector untuk memeriksa apakah user adalah EO
export const selectIsUserEO = (state: RootState) => state.userSlice.role === "eo";

// Selector untuk memeriksa apakah user adalah Customers
export const selectIsUserCustomers = (state: RootState) => state.userSlice.role === "customers";

export default userSlice.reducer;
