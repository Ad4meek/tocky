import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: {
        isFetching: false,
        isAuthenticated: false
    },
    user: {
        name: "",
        email: "",
        uniqueId: "",
    },
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setIsFetching: (state) => {
            state.status.isFetching = true;
        },
        setIsFetched: (state, action) => {
            state.status = {
                isFetching: action.payload.status.isFetching,
                isAuthenticated: true
            }
                        
            state.user = {
                name: action.payload.user.name,
                email: action.payload.user.email,
                uniqueId: action.payload.user.uniqueId
            }
        },
        reset: (state) => {
            state = initialState;
        }
    },
});

export const { setIsFetching, setIsFetched } = userSlice.actions;
export default userSlice.reducer;
