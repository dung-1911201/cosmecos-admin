import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, deleteUser } from '../../redux/slices/userSlice';
import { Button, Popconfirm, Space, Table } from 'antd';
const UserList = () => {
	const dispatch = useDispatch();
	const { users } = useSelector((state) => state.user);
	let navigate = useNavigate();

	useEffect(() => {
		getUsers();
	}, []);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));
		if (!user) {
			navigate('/login');
		}
	}, []);

	const handleRemoveUser = async (userId) => {
		// try {
		await dispatch(deleteUser(userId));
		dispatch(getUsers());
		// } catch (error) {}
	};
	const columns = [
		{
			title: 'User Name',
			dataIndex: 'userName',
			key: 'userName'
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'mail'
		},
		{
			title: 'Status',
			dataIndex: 'status',
			render: (_, item) => (
				<div style={{ color: item.status === 'Active' ? 'green' : 'red', fontWeight: 'bold' }}>
					{item.status}
				</div>
			)
		},
		{
			title: '',
			dataIndex: '',
			render: (_, item) => (
				<Space size='large'>
					<div className='group-action'>
						<Popconfirm
							placement='top'
							title='Bạn có muốn xoá không?'
							onConfirm={() => handleRemoveUser(item.key)}
							okText='Xác nhận xoá'
							cancelText='Cancel'
						>
							<div>
								<Button type='primary' danger>
									Remove
								</Button>
							</div>
						</Popconfirm>
					</div>
				</Space>
			)
		}
	];
	return (
		<div className='product-container'>
			<h2>Danh sách người dùng</h2>
			<Link to='/user/create'>
				<Button type='primary' className='btn-add-prod'>
					Add User
				</Button>
			</Link>
			<Table
				className='user-table'
				dataSource={
					users &&
					users.map((item) => ({
						key: item._id,
						userName: item.userName,
						email: item.email,
						status: item.status
					}))
				}
				columns={columns}
			/>
		</div>
	);
};

export default UserList;
