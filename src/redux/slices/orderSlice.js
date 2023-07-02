import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { publicRequest, userRequest } from '../../requestMethod';

export const getOrderUser = createAsyncThunk('order/getOrder', async () => {
	try {
		const response = await userRequest.get('/order');
		return response.data;
	} catch (error) {
		console.log(error);
	}
});
export const createOrderUser = createAsyncThunk('order/createOrder', async (data) => {
	try {
		const response = await userRequest.post('/order', data);
		return response.data;
	} catch (error) {
		console.log(error);
	}
});

export const updateOrderUser = createAsyncThunk('order/updateOrder', async ({ data, orderId }) => {
	try {
		const response = await userRequest.put(`/order/${orderId}`, data);
		return response.data;
	} catch (error) {
		console.log(error);
	}
});

export const getOrderStat = createAsyncThunk('order/orderStat', async () => {
	const response = await userRequest.get('/order/orderStat');
	return response.data;
});

export const getOrderIncome = createAsyncThunk('order/createOrderIncome', async () => {
	const response = await userRequest.get('/order/orderIncome');
	return response.data;
});

export const getReturnOrder = createAsyncThunk('order/returnOrder', async () => {
	const response = await userRequest.get('/order/getReturn');
	return response.data;
});

export const getOrderCompareStat = createAsyncThunk('order/getOrderCompare', async () => {
	const response = await userRequest.get('order/getCompareOrder');
	return response.data;
});

export const exportToExcel = createAsyncThunk('order/exportToExcel', async (data) => {
	const response = await userRequest.post('order/exportToExcel', data);
	return response.data;
});

const orderSlice = createSlice({
	name: 'order',
	initialState: {
		orders: [],
		isOrderSuccess: false,
		orderStat: [],
		orderIncome: null,
		orderReturn: null,
		orderCompare: {}
	},
	reducers: {
		createOrderEnd(state, action) {
			state.isOrderSuccess = false;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getOrderUser.fulfilled, (state, action) => {
			state.orders = action.payload;
		});

		builder.addCase(createOrderUser.fulfilled, (state, action) => {
			state.isOrderSuccess = true;
		});

		builder.addCase(getOrderStat.fulfilled, (state, action) => {
			state.orderStat = action.payload;
		});

		builder.addCase(getOrderIncome.fulfilled, (state, action) => {
			state.orderIncome = action.payload;
		});

		builder.addCase(getReturnOrder.fulfilled, (state, action) => {
			state.orderReturn = action.payload;
		});

		builder.addCase(getOrderCompareStat.fulfilled, (state, action) => {
			state.orderCompare = action.payload;
		});
	}
});

export const { createOrderEnd } = orderSlice.actions;
export default orderSlice.reducer;
