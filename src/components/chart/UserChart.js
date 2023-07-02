import React from 'react';
import { Paper, Box } from '@mui/material';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowDownOutlined, ArrowUpOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
const Dashboard = () => {
	const [orders, setOrder] = useState([]);
	const [users, setUser] = useState([]);

	const getUserList = async () => {
		try {
			const response = await axios.get('http://localhost:5050/api/user');
			console.log('response: ', response.data);
			setUser(response.data);
		} catch (error) {}
	};

	const getOrderList = async () => {
		try {
			const response = await axios.get('http://localhost:5050/api/order');
			setOrder(response.data);
		} catch (error) {}
	};

	useEffect(() => {
		getUserList();
		getOrderList();
	}, []);

	const t1 = 1;
	const t2 = 2;
	const t3 = 3;
	const t4 = 4;
	const t5 = 5;
	const t6 = 6;
	const t7 = 7;
	const t8 = 8;
	const t9 = 9;
	const t10 = 10;
	const t11 = 11;
	const t12 = 11;

	const data = [
		{
			month: 'Tháng 1',
			user: 0,
			order: 0
		},
		{
			month: 2,
			user: 0,
			order: 0
		},
		{
			month: 3,
			user: 0,
			order: 0
		},
		{
			month: 4,
			user: 0,
			order: 0
		},
		{
			month: 5,
			user: 0,
			order: 0
		},
		{
			month: 6,
			user: 0,
			order: 0
		},
		{
			month: 7,
			user: 0,
			order: 0
		},
		{
			month: 8,
			user: 0,
			order: 0
		},
		{
			month: 9,
			user: 0,
			order: 0
		},
		{
			month: 10,
			user: 0,
			order: 0
		},
		{
			month: 11,
			user: 0,
			order: 0
		},
		{
			month: 12,
			user: 0,
			order: 0
		}
	];
	users &&
		users.forEach((item) => {
			const date = item.createdAt.split('/')[0];
			const year = item.createdAt.split('/')[2];
			if (date === '01' && year === '2023') {
				data[0].user++;
			}
			if (date === '02' && year === '2023') {
				data[1].user++;
			}
			if (date === '03' && year === '2023') {
				data[2].user++;
			}
			if (date === '04' && year === '2023') {
				data[3].user++;
			}
			if (date === '05' && year === '2023') {
				data[4].user++;
			}
			if (date === '06' && year === '2023') {
				data[5].user++;
			}
			if (date === '07' && year === '2023') {
				data[6].user++;
			}
			if (date === '08' && year === '2023') {
				data[7].user++;
			}
			if (date === '09' && year === '2023') {
				data[8].user++;
			}
			if (date === '10' && year === '2023') {
				data[9].user++;
			}
			if (date === '11' && year === '2023') {
				data[10].user++;
			}

			if (date === '12') {
				data[11].user++;
			}
		});

	orders &&
		orders.forEach((item) => {
			const date = item.createdAt.split('-')[1];
			const year = item.createdAt.split('-')[0];
			if (date === '01' && year === '2023') {
				data[0].order++;
			}
			if (date === '02' && year === '2023') {
				data[1].order++;
			}
			if (date === '03' && year === '2023') {
				data[2].order++;
			}
			if (date === '04' && year === '2023') {
				data[3].order++;
			}
			if (date === '05' && year === '2023') {
				data[4].order++;
			}
			if (date === '06' && year === '2023') {
				data[5].order++;
			}
			if (date === '07' && year === '2023') {
				data[6].order++;
			}
			if (date === '08' && year === '2023') {
				data[7].order++;
			}
			if (date === '09' && year === '2023') {
				data[8].order++;
			}
			if (date === '10' && year === '2023') {
				data[9].order++;
			}
			if (date === '11' && year === '2023') {
				data[10].order++;
			}

			if (date === '12' && year === '2023') {
				data[11].order++;
			}
		});

	const orderFilter = orders && orders.filter((item) => item.status === 'Success');
	const total = orderFilter.reduce((x, y) => {
		return (x += y.totalOrder);
	}, 0);
	console.log('total: ', total);
	const { orderStat, orderIncome, orderReturn } = useSelector((state) => state.order);
	const date = new Date();
	const monthNow = date.getMonth() + 1;
	let percentOrderThisMonthComparePreMonth;
	let orderThisMonth;
	let orderPreMonth;
	if (orderStat.length > 0) {
		orderThisMonth = orderStat.find((item) => item._id === monthNow - 1);
		orderPreMonth = orderStat.find((item) => item._id === monthNow - 2);
		percentOrderThisMonthComparePreMonth =
			orderThisMonth &&
			orderPreMonth &&
			((orderThisMonth.totalOrder - orderPreMonth.totalOrder) / orderPreMonth.totalOrder) * 100;
	}

	return (
		<div className='dash-container'>
			<div className='dash-container-top row'>
				<div
					className='paperFeatured col'
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',

						height: 200
					}}
				>
					Tổng đơn hàng:
					<h2>{orders?.length}</h2>
				</div>
				<div
					className='paperFeatured col'
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',

						height: 200
					}}
				>
					Tổng người đăng ký:
					<h2>{users?.length}</h2>
				</div>
				<div
					className='paperFeatured col'
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',

						height: 200
					}}
				>
					<div>
						<h5 fontWeight='600'>Total Order This Month</h5>
						<h3 fontWeight='bold'>{orderThisMonth && orderThisMonth.total}</h3>
						<h6 style={{ display: 'flex', alignItems: 'center' }}>
							{percentOrderThisMonthComparePreMonth && percentOrderThisMonthComparePreMonth > 0 ? (
								<ArrowUpOutlined style={{ color: 'green' }} />
							) : (
								<ArrowDownOutlined style={{ color: 'red' }} />
							)}
							Compared to last month
						</h6>
					</div>
					<div>
						<ShoppingCartOutlined fontSize='large' color='success' />
					</div>
				</div>
				<div
					className='paperFeatured col'
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',

						height: 200
					}}
				>
					<div>
						<h5 fontWeight='600'>Total Sales</h5>
						<h2>{total?.toLocaleString('it-IT', { style: 'currency', currency: 'USD' })}</h2>
						<h6 style={{ display: 'flex', alignItems: 'center' }}>
							<ArrowUpOutlined style={{ color: 'green' }} />
							Compared to last month
						</h6>
					</div>
					<div>
						<ShoppingCartOutlined fontSize='large' color='warning' />
					</div>
				</div>
			</div>
			<div className='dung'>
				<Box >
					<Box>
						<ResponsiveContainer width='100%' height='100%'>
							<Paper className='paper-chart'>
								<LineChart
									width={1120}
									height={500}
									data={data}
									margin={{
										top: 50,
										right: 50,
										left: 5,
										bottom: 5
									}}
								>
									<CartesianGrid strokeDasharray='3 3' />
									<XAxis dataKey='month' />
									<Tooltip />
									<Legend />
									<YAxis />
									<Line type='monotone' dataKey='order' stroke='#82ca9d' activeDot={{ r: 6 }} />
									{/* <Line type='monotone' dataKey='user' stroke='#8884d8' activeDot={{ r: 5 }} /> */}
								</LineChart>
							</Paper>
						</ResponsiveContainer>
					</Box>
				</Box>
			</div>
		</div>
	);
};

export default Dashboard;
