import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { publicRequest, userRequest } from '../../requestMethod';

export const userRegister = createAsyncThunk('user/register', async (user) => {
	const response = await publicRequest.post('/auth/register', user);
	return response.data;
});

export const getUsers = createAsyncThunk('user/getUsers', async () => {
	const response = await userRequest.get('/user');
	return response.data;
});

export const userLogin = createAsyncThunk('user/userLogin', async (user) => {
	const response = await publicRequest.post('/auth/login', user);
	return response.data;
});

export const getUserStat = createAsyncThunk('user/userStat', async () => {
	const response = await userRequest.get('user/userStat');
	return response.data;
});
export const deleteUser = createAsyncThunk('user/delete', async (userId) => {
	try {
		const response = await userRequest.delete(`/user/${userId}`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
});
const userSlice = createSlice({
	name: 'user',
	initialState: {
		users: [],
		user: JSON.parse(localStorage.getItem('user')),
		isLogin: false,
		errorMessage: {},
		userStat: []
	},
	reducers: {
		userLogout(state, action) {
			state.users = [];
			localStorage.removeItem('user');
			state.user = JSON.parse(localStorage.getItem('user'));
			state.errorMessage = {};
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(userLogin.pending, (state, action) => {
				state.isLogin = true;
			})
			.addCase(userLogin.fulfilled, (state, action) => {
				console.log('action: ', action);
				if (action.payload.isAdmin === false) {
					alert('Không có quyền truy cập trang này!!!');
					localStorage.clear();
					window.location = '/login';
					state.isLogin = false;
					return;
				}
				console.log('okeeeee');
				localStorage.setItem('user', JSON.stringify(action.payload));
				state.user = action.payload;
				state.isLogin = false;
				window.location = '/';
			})
			.addCase(userLogin.rejected, (state, action) => {
				state.errorMessage.login = 'Email or password incorrect !';
			});

		builder.addCase(getUsers.fulfilled, (state, action) => {
			state.users = action.payload;
		});

		builder.addCase(getUserStat.fulfilled, (state, action) => {
			state.userStat = action.payload;
		});
	}
});

export const { userLogout, registerStart } = userSlice.actions;

export default userSlice.reducer;
