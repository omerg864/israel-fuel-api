import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// get user from local storage
const user = JSON.parse(localStorage.getItem("user"));


const initialState = {
    user: user ? user : null ,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
};

// register user
export const register = createAsyncThunk("auth/register", async (user, thunkAPI) => {
    try{
        const payload =  await authService.register(user);
        const message = payload.message;
        if (message === "User created successfully"){
            return payload;
        }
        else{
            return thunkAPI.rejectWithValue(payload);
        }
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue({message});
    }
});

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
    try{

        const payload =  await authService.login(user);
        if (payload.message === "Invalid email or password"){
            return thunkAPI.rejectWithValue({message: payload.message});
        }
        return payload;
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue({message});
    }
});

export const logout = createAsyncThunk("auth/logout", async () => {
    await authService.logout();
});

export const getNewApiToken = createAsyncThunk("auth/getNewApiToken", async (_, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await authService.getNewApiToken(token);
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue({message});
    }
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.isLoading = true;
        }).addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
        }).addCase(register.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.user = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                }).addCase(login.pending, (state) => {
                    state.isLoading = true;
                }).addCase(login.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.user = action.payload;
                }).addCase(login.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                    state.user = null;
                    })
                    .addCase(getNewApiToken.pending, (state) => {
                        state.isLoading = true;
                    }).addCase(getNewApiToken.fulfilled, (state, action) => {
                        state.isLoading = false;
                        state.isSuccess = true;
                        state.user.api_token = action.payload.api_token;
                    }).addCase(getNewApiToken.rejected, (state, action) => {
                        state.isLoading = false;
                        state.isError = true;
                        state.message = action.payload;
                        state.user = null;
                        })
    }
});

export const { reset } = authSlice.actions;
export default  authSlice.reducer;