import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOrderUser, updateOrderUser } from '../../redux/slices/orderSlice';
import { Paper, Box } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
const DetailsOrder = () => {
	const location = useLocation();
	const dispatch = useDispatch();

	const path = location.pathname.split('/')[3];
	const { orders } = useSelector((state) => state.order);
	const userOrder = orders.find((item) => {
		return item._id === path;
	});

	useEffect(() => {
		dispatch(getOrderUser());
	}, [dispatch]);

	return (
		<Box className='order-details-container'>
			<h3>INFO CUSTOMER</h3>
			<div style={{ width: '30%', height: 5, backgroundColor: '#333', margin: 20 }}></div>
			<Paper className='order-details-table'>
				<table className='detail-product-table'>
					<tr>
						<th>User Id</th>
						<th>User Name</th>
						<th>Phone</th>
						<th>Address</th>
						<th>Email</th>
					</tr>
					<tr>
						<td>{userOrder?.userId}</td>
						<td>{userOrder?.userName}</td>
						<td>{userOrder?.phone}</td>
						<td>{userOrder?.address}</td>
						<td>{userOrder?.email}</td>
					</tr>
				</table>
			</Paper>
			<h3 style={{ marginTop: 20 }}>PRODUCT ORDER</h3>
			<div style={{ width: '30%', height: 5, backgroundColor: '#333', margin: 20 }}></div>
			<TableContainer component={Paper}>
				<Table className='detail-order-product' sx={{ minWidth: 650 }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell>STT</TableCell>
							<TableCell align='center'>Product Id</TableCell>
							<TableCell align='center'>Avatar</TableCell>
							<TableCell align='center'>Name</TableCell>
							{/* <TableCell align='center'>Description</TableCell> */}
							<TableCell align='center'>Quantity</TableCell>
							<TableCell align='center'>Total</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{userOrder.product &&
							userOrder?.product.map((row, index) => (
								<TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell component='th' scope='row'>
										{index + 1}
									</TableCell>
									<TableCell align='right'>{row.productId}</TableCell>
									<TableCell align='right'>
										<img
											alt=''
											style={{ borderRadius: '50%' }}
											src={row.image}
											width={60}
											height={60}
										/>
									</TableCell>
									<TableCell align='right'>{row.productName}</TableCell>
									{/* <TableCell align='right'>{row.productDesc}</TableCell> */}

									<TableCell align='right'>{row.quantity}</TableCell>
									<TableCell align='right'>{row.total} $</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
			<Box sx={{ mt: 10 }}>
				<h3>
					Total Order :<mark>{userOrder.totalOrder} $</mark>
				</h3>
				{/* <button>Export To Excel</button> */}
			</Box>
		</Box>
	);
};

export default DetailsOrder;
