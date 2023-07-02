import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

import { userRequest } from '../../requestMethod'


export const getAllMessageUser = createAsyncThunk(
    "message/getAllMessageUser", async () => {
        const response = await userRequest.get('/getAllMessageUser');
        return response.data;
    }
)


const messageSlice = createSlice({
    name: "message",
    initialState: {
        messages: []
    },
    extraReducers: (builder) => {
        builder.addCase(getAllMessageUser.fulfilled, (state, action) => {
            state.messages = action.payload;
        })
    }
})


export default messageSlice.reducer; 