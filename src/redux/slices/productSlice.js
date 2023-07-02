import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userRequest } from '../../requestMethod';

export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
	try {
		const response = await userRequest.get('/product', {
			params: {
				orderBy: 'createdAt',
				direction: 'desc'
			}
		});
		console.log('response: ', response);
		return response.data;
	} catch (error) {
		console.log(error);
	}
});

export const deleteProduct = createAsyncThunk('product/delete', async (productId) => {
	try {
		const response = await userRequest.delete(`/product/${productId}`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
});

export const updateProduct = createAsyncThunk('product/update', async ({ productId, data }) => {
	try {
		const response = await userRequest.put(`product/${productId}`, data);
		return response.data;
	} catch (error) {
		console.log(error);
	}
});

const productSlice = createSlice({
	name: 'product',
	initialState: {
		products: [],
		singleProduct: {}
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchProducts.fulfilled, (state, action) => {
			state.products = action.payload;
		});

		builder.addCase(updateProduct.fulfilled, (state, action) => {
			let mIndex;
			state.products = state.products.filter((item, index) => {
				if (item._id === action.payload._id) {
					mIndex = index;
				}
				return item._id !== action.payload._id;
			});
			state.products = [
				...state.products.slice(0, mIndex),
				{ ...action.payload },
				...state.products.slice(mIndex)
			];
		});
	}
});

export default productSlice.reducer;
