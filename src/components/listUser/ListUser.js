import { Table } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
const ListUser = () => {
	const { users } = useSelector((state) => state.user);

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
		}
	];

	return (
		<div
			className='paper-list-user'
			sx={{
				width: '100%',
				height: 500,
				overflowX: 'hidden',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center'
			}}
		>
			<Table
				className='user-table'
				dataSource={
					users &&
					users.map((item) => ({
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

export default ListUser;
