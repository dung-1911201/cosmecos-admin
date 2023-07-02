import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderUser, updateOrderUser } from '../../redux/slices/orderSlice';
import { getOrderCompareStat, exportToExcel } from '../../redux/slices/orderSlice';
import { Button, Table, Popconfirm, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CheckOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

const stateOrder = ['Pending', 'WaitingForDelivery', 'Delivering', 'Success', 'Cancelled'];

const OrderList = () => {
	const iState = JSON.parse(localStorage.getItem('indexState'));
	const oState = JSON.parse(localStorage.getItem('orderState'));
	const [indexState, setIndexState] = useState(iState && iState);
	const [orderState, setOrderState] = useState(oState && oState);
	localStorage.setItem('indexState', JSON.stringify(indexState));
	localStorage.setItem('orderState', JSON.stringify(orderState));
	const dispatch = useDispatch();
	let navigate = useNavigate();
	const { orders } = useSelector((state) => state.order);
	const { orderCompare } = useSelector((state) => state.order);
	const ordersPending = orders?.filter((item) => {
		return item.status === 'Pending';
	});
	const orderWaitingDelivery = orders.filter((item) => {
		return item.status === 'Waiting Delivery';
	});
	const orderDelivering = orders.filter((item) => {
		return item.status === 'Delivering';
	});
	const orderSuccess = orders.filter((item) => {
		return item.status === 'Success';
	});

	const orderCancel = orders.filter((item) => {
		return item.status === 'Cancelled';
	});
	const handleConfirmOrder = async (orderId) => {
		const userOrder = orders.find((item) => {
			return item._id === orderId;
		});
		const order = { ...userOrder, status: 'Waiting Delivery' };
		await dispatch(updateOrderUser({ data: order, orderId }));
		dispatch(getOrderUser());
		// navigate(0);
	};
	const handleDelivery = async (orderId) => {
		const userOrder = orders.find((item) => {
			return item._id === orderId;
		});
		const order = { ...userOrder, status: 'Delivering' };

		await dispatch(updateOrderUser({ data: order, orderId }));
		dispatch(getOrderUser());
	};
	const handleSuccess = async (orderId) => {
		const userOrder = orders.find((item) => {
			return item._id === orderId;
		});
		const order = { ...userOrder, status: 'Success', isPaid: true };

		await dispatch(updateOrderUser({ data: order, orderId }));
		dispatch(getOrderUser());
	};
	const handleCancel = async (orderId) => {
		const userOrder = orders.find((item) => {
			return item._id === orderId;
		});
		const order = { ...userOrder, status: 'Cancelled' };

		await dispatch(updateOrderUser({ data: order, orderId }));
		dispatch(getOrderUser());
	};

	const handleClickState = (item, index) => {
		setOrderState(item);
		setIndexState(index);
	};

	const currentMonth = new Date().getMonth() + 1;
	const listSuccess = orderCompare && orderCompare.orderSuccess;
	const listCancel = orderCompare && orderCompare.orderCancelled;
	let newListSuccess = listSuccess && [...listSuccess];
	let newListCancel = listCancel && [...listCancel];
	for (let i = 1; i <= currentMonth; i++) {
		const dataFind =
			listSuccess &&
			listSuccess.find((item) => {
				return item._id === i;
			});
		if (!dataFind) {
			newListSuccess && newListSuccess.push({ _id: i, totalSuccess: 0 });
			newListSuccess = newListSuccess && newListSuccess.sort((a, b) => a._id - b._id);
		}
	}
	for (let i = 1; i <= currentMonth; i++) {
		const dataFind =
			listCancel &&
			listCancel.find((item) => {
				return item._id === i;
			});
		if (!dataFind) {
			newListCancel && newListCancel.push({ _id: i, totalCancelled: 0 });
			newListCancel = newListCancel && newListCancel.sort((a, b) => a._id - b._id);
		}
	}

	const data =
		newListSuccess &&
		newListSuccess.map((item, index) => {
			return {
				name: item._id,
				success: item.totalSuccess,
				cancel: newListCancel[index].totalCancelled
			};
		});

	const handleExportExcel = () => {
		dispatch(exportToExcel(orderSuccess));
		alert('Export to excel success !');
	};

	useEffect(() => {
		dispatch(getOrderUser());
		dispatch(getOrderCompareStat());
	}, [dispatch]);

	const ColumnPending = [
		{
			title: 'ID',
			dataIndex: '_id',
			key: '_id'
		},
		{
			title: 'User Name',
			dataIndex: 'userName',
			key: 'userName'
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email'
		},
		{
			title: 'Order Date',
			dataIndex: 'orderDate',
			key: 'orderDate'
		},
		{
			title: 'Method Pay',
			dataIndex: 'methodPay',
			key: 'methodPay'
		},
		{
			title: 'Paid',
			dataIndex: 'isPaid',
			key: 'isPaid',
			render: (_, item) => {
				return item.isPaid === true ? (
					<span style={{ color: 'green', fontWeight: 'bold' }}>Paid</span>
				) : (
					<span style={{ color: 'red', fontWeight: 'bold' }}>No Paid</span>
				);
			}
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			render: (_, item) => {
				return item.status === 'Success' ? (
					<span style={{ backgroundColor: '#86eb34' }}>{item.status}</span>
				) : (
					<span style={{ backgroundColor: '#eb3434' }}>{item.status}</span>
				);
			}
		},
		{
			title: 'Option',
			dataIndex: 'option',
			key: 'option',
			render: (_, item) => (
				<Space size='large'>
					<Link to={`/order/details/${item._id}`}>
						<Button>
							<EyeOutlined />
							View
						</Button>
					</Link>
					<Button onClick={() => handleConfirmOrder(item._id)}>
						<CheckOutlined />
						Confirm
					</Button>
					<Button onClick={() => handleCancel(item._id)}>
						<DeleteOutlined />
					</Button>
				</Space>
			)
		}
	];
	const ColumnWaitingDelivery = [
		{
			title: 'ID',
			dataIndex: '_id',
			key: '_id'
		},
		{
			title: 'User Name',
			dataIndex: 'userName',
			key: 'userName'
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email'
		},
		{
			title: 'Order Date',
			dataIndex: 'orderDate',
			key: 'orderDate'
		},
		{
			title: 'Method Pay',
			dataIndex: 'methodPay',
			key: 'methodPay'
		},
		{
			title: 'Paid',
			dataIndex: 'isPaid',
			key: 'isPaid',
			render: (_, item) => {
				return item.isPaid === true ? (
					<span style={{ color: 'green', fontWeight: 'bold' }}>Paid</span>
				) : (
					<span style={{ color: 'red', fontWeight: 'bold' }}>No Paid</span>
				);
			}
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			render: (_, item) => {
				return item.status === 'Success' ? (
					<span style={{ backgroundColor: '#86eb34' }}>{item.status}</span>
				) : (
					<span style={{ backgroundColor: '#eb3434' }}>{item.status}</span>
				);
			}
		},
		{
			title: 'Option',
			dataIndex: 'option',
			key: 'option',
			render: (_, item) => (
				<Space size='large'>
					<Link to={`/order/details/${item._id}`}>
						<Button>
							<EyeOutlined />
							View
						</Button>
					</Link>
					<Button onClick={() => handleDelivery(item._id)}>
						<CheckOutlined />
						Confirm
					</Button>
					<Button onClick={() => handleCancel(item._id)}>
						<DeleteOutlined />
					</Button>
				</Space>
			)
		}
	];
	const ColumnSuccess = [
		{
			title: 'ID',
			dataIndex: '_id',
			key: '_id'
		},
		{
			title: 'User Name',
			dataIndex: 'userName',
			key: 'userName'
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email'
		},
		{
			title: 'Order Date',
			dataIndex: 'orderDate',
			key: 'orderDate'
		},
		{
			title: 'Method Pay',
			dataIndex: 'methodPay',
			key: 'methodPay'
		},
		{
			title: 'Paid',
			dataIndex: 'isPaid',
			key: 'isPaid',
			render: (_, item) => {
				return item.isPaid === true ? (
					<span style={{ color: 'green', fontWeight: 'bold' }}>Paid</span>
				) : (
					<span style={{ color: 'red', fontWeight: 'bold' }}>No Paid</span>
				);
			}
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			render: (_, item) => {
				return item.status === 'Success' ? (
					<span style={{ backgroundColor: '#86eb34' }}>{item.status}</span>
				) : (
					<span style={{ backgroundColor: '#eb3434' }}>{item.status}</span>
				);
			}
		},
		{
			title: 'Option',
			dataIndex: 'option',
			key: 'option',
			render: (_, item) => (
				<Space size='large'>
					<Link to={`/order/details/${item._id}`}>
						<Button>
							<EyeOutlined />
							View
						</Button>
					</Link>
					<Button onClick={() => handleSuccess(item._id)}>
						<CheckOutlined />
						Confirm
					</Button>
					<Button onClick={() => handleCancel(item._id)}>
						<DeleteOutlined />
					</Button>
				</Space>
			)
		}
	];
	const ColumnDone = [
		{
			title: 'ID',
			dataIndex: '_id',
			key: '_id'
		},
		{
			title: 'User Name',
			dataIndex: 'userName',
			key: 'userName'
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email'
		},
		{
			title: 'Order Date',
			dataIndex: 'orderDate',
			key: 'orderDate'
		},
		{
			title: 'Method Pay',
			dataIndex: 'methodPay',
			key: 'methodPay'
		},
		{
			title: 'Paid',
			dataIndex: 'isPaid',
			key: 'isPaid',
			render: (_, item) => {
				return item.isPaid === true ? (
					<span style={{ color: 'green', fontWeight: 'bold' }}>Paid</span>
				) : (
					<span style={{ color: 'red', fontWeight: 'bold' }}>No Paid</span>
				);
			}
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			render: (_, item) => {
				return item.status === 'Success' ? (
					<span style={{ backgroundColor: '#86eb34' }}>{item.status}</span>
				) : (
					<span style={{ backgroundColor: '#eb3434' }}>{item.status}</span>
				);
			}
		},
		{
			title: 'Option',
			dataIndex: 'option',
			key: 'option',
			render: (_, item) => (
				<Space size='large'>
					<Link to={`/order/details/${item._id}`}>
						<Button>
							<EyeOutlined />
							View
						</Button>
					</Link>
				</Space>
			)
		}
	];
	const ColumnCancle = [
		{
			title: 'ID',
			dataIndex: '_id',
			key: '_id'
		},
		{
			title: 'User Name',
			dataIndex: 'userName',
			key: 'userName'
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email'
		},
		{
			title: 'Order Date',
			dataIndex: 'orderDate',
			key: 'orderDate'
		},
		{
			title: 'Method Pay',
			dataIndex: 'methodPay',
			key: 'methodPay'
		},
		{
			title: 'Paid',
			dataIndex: 'isPaid',
			key: 'isPaid',
			render: (_, item) => {
				return item.isPaid === true ? (
					<span style={{ color: 'green', fontWeight: 'bold' }}>Paid</span>
				) : (
					<span style={{ color: 'red', fontWeight: 'bold' }}>No Paid</span>
				);
			}
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status'
		},
		{
			title: 'Option',
			dataIndex: 'option',
			key: 'option',
			render: (_, item) => (
				<Space size='large'>
					<Link to={`/order/details/${item._id}`}>
						<Button>
							<EyeOutlined />
							View
						</Button>
						<Button onClick={() => handleConfirmOrder(item._id)}>
							Delivery
							<CheckOutlined />
						</Button>
					</Link>
				</Space>
			)
		}
	];
	console.log('ordersPending: ', ordersPending);

	return (
		<>
			{/* <div className='order-list-charts' sx={{ width: '80%', height: '300px' }}>
				<h3>Order Charts</h3>
				<div style={{ width: '30%', height: 5, backgroundColor: '#333', margin: 20 }}></div>
				<ResponsiveContainer width='100%' height='100%'>
					<BarChart
						width={500}
						height={300}
						data={data}
						margin={{
							top: 5,
							right: 30,
							left: 20,
							bottom: 5
						}}
					>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='name' />
						<Tooltip />
						<Legend />
						<Bar dataKey='success' fill='green' />
						<Bar dataKey='cancel' fill='orangered' />
					</BarChart>
				</ResponsiveContainer>
			</div> */}
			<div className='order-list-container'>
				<h3 style={{ textAlign: 'center', margin: 20 }}>List Orders</h3>
				<div style={{ width: '30%', height: 5, backgroundColor: '#333', marginBottom: 20 }}></div>
				<ul>
					{stateOrder.map((item, index) => {
						return (
							<li
								className={indexState === index ? 'index-active' : ''}
								onClick={() => handleClickState(item, index)}
							>
								{item}
							</li>
						);
					})}
				</ul>
				<div sx={{ mt: 5, width: '100%' }}>
					{orderState === 'Pending' && (
						<Table
							dataSource={ordersPending.map((item) => ({
								_id: item._id,
								userName: item.userName,
								email: item.email,
								orderDate: item.orderDate,
								methodPay: item.methodPay,
								isPaid: item.isPaid,
								status: item.status
							}))}
							columns={ColumnPending}
						/>
					)}
					{orderState === 'WaitingForDelivery' && (
						<Table
							dataSource={orderWaitingDelivery.map((item) => ({
								_id: item._id,
								userName: item.userName,
								email: item.email,
								orderDate: item.orderDate,
								methodPay: item.methodPay,
								isPaid: item.isPaid,
								status: item.status
							}))}
							columns={ColumnWaitingDelivery}
						/>
					)}
					{orderState === 'Delivering' && (
						<Table
							dataSource={orderDelivering.map((item) => ({
								_id: item._id,
								userName: item.userName,
								email: item.email,
								orderDate: item.orderDate,
								methodPay: item.methodPay,
								isPaid: item.isPaid,
								status: item.status
							}))}
							columns={ColumnSuccess}
						/>
					)}
					{orderState === 'Success' && (
						<div>
							<Table
								dataSource={orderSuccess.map((item) => ({
									_id: item._id,
									userName: item.userName,
									email: item.email,
									orderDate: item.orderDate,
									methodPay: item.methodPay,
									isPaid: item.isPaid,
									status: item.status
								}))}
								columns={ColumnDone}
							/>

							<button onClick={() => handleExportExcel()} className='btn-export-excel'>
								Export To Excel
							</button>
						</div>
					)}
					{orderState === 'Cancelled' && (
						<Table
							dataSource={orderCancel.map((item) => ({
								_id: item._id,
								userName: item.userName,
								email: item.email,
								orderDate: item.orderDate,
								methodPay: item.methodPay,
								isPaid: item.isPaid,
								status: item.status
							}))}
							columns={ColumnCancle}
						/>
					)}
				</div>
			</div>
		</>
	);
};

export default OrderList;
