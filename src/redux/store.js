import {configureStore} from '@reduxjs/toolkit'
import productSlice from './slices/productSlice'
import orderSlice from './slices/orderSlice'
import userSlice from './slices/userSlice'
import messageSlice from './slices/messageSlice'
export const store = configureStore({
    reducer:{
        product:productSlice,
        order:orderSlice,
        user:userSlice,
        message:messageSlice
    }
})