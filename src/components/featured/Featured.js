import {
	ArrowDownOutlined,
	ArrowUpOutlined,
	DollarOutlined,
	DownSquareOutlined,
	ShoppingCartOutlined
} from '@ant-design/icons';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrderStat, getOrderIncome, getReturnOrder } from '../../redux/slices/orderSlice';
const Featured = () => {
	const { orderStat, orderIncome, orderReturn } = useSelector((state) => state.order);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getOrderStat());
		dispatch(getReturnOrder());
		dispatch(getOrderIncome());
	}, [dispatch]);

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
			((orderThisMonth.total - orderPreMonth.total) / orderPreMonth.total) * 100;
	}
	return (
		<div style={{ marginTop: 15, display: 'flex', justifyContent: 'space-around' }}>
			<div
				className='paperFeatured'
				style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20%', height: 200 }}
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
				className='paperFeatured'
				style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20%', height: 200 }}
			>
				<div>
					<h5 fontWeight='600'>Total Sales</h5>
					<h3 fontWeight='bold'>33</h3>
					<h6 style={{ display: 'flex', alignItems: 'center' }}>
						<ArrowUpOutlined style={{ color: 'green' }} />
						Compared to last month
					</h6>
				</div>
				<div>
					<ShoppingCartOutlined fontSize='large' color='warning' />
				</div>
			</div>
			<div
				className='paperFeatured'
				style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20%', height: 200 }}
			>
				<div>
					<h5 fontWeight='600'>Total Benefit</h5>
					<h3 fontWeight='bold'>{orderIncome && orderIncome.sumThisMonth}</h3>
					<h6 style={{ display: 'flex', alignItems: 'center' }}>
						{orderIncome && orderIncome.percent > 0 ? (
							<ArrowUpOutlined style={{ color: 'green' }} />
						) : (
							<ArrowDownOutlined style={{ color: 'red' }} />
						)}
						Compared to last month
					</h6>
				</div>
				<div>
					<DollarOutlined fontSize='large' style={{ color: '#c6c90e' }} />
				</div>
			</div>
			<div
				className='paperFeatured'
				style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20%', height: 200 }}
			>
				<div>
					<h5 fontWeight='600'>Total Return</h5>
					<h3 fontWeight='bold'>{orderReturn && orderReturn.returnThisMonth}</h3>
					<h6 style={{ display: 'flex', alignItems: 'center' }}>
						{orderReturn && orderReturn.percent > 0 ? (
							<ArrowUpOutlined style={{ color: 'green' }} />
						) : (
							<ArrowDownOutlined style={{ color: 'red' }} />
						)}
						Compared to last month
					</h6>
				</div>
				<div>
					<DownSquareOutlined fontSize='large' style={{ color: 'red' }} />
				</div>
			</div>
		</div>
	);
};

export default Featured;
