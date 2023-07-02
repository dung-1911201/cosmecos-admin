import React, { Fragment, useEffect } from 'react';
import Featured from '../../components/featured/Featured';
import ListUser from '../../components/listUser/ListUser';
import UserChart from '../../components/chart/UserChart';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUsers, getUserStat } from '../../redux/slices/userSlice';
import { Col, Row } from 'antd';
const Home = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// useEffect(() => {
	// 	const user = JSON.parse(localStorage.getItem('user'));
	// 	if (!user || !user.isAdmin) {
	// 		navigate('/login');
	// 	}
	// }, []);

	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getUserStat());
	}, [dispatch]);

	return (
		<Fragment>
			<div style={{ width: '100%' }}>
				<div
					style={{ display: 'flex', justifyContent: 'space-between', width: '100%', flexDirection: 'column' }}
				>
					{/* <Featured /> */}
					<div className='row' style={{ marginTop: 5, padding: 5 }}>
						<div className='col'>
							<UserChart />
							<ListUser />
						</div>
						{/* <Row style={{ color: 'black', display: 'flex' }}>
							<Col className='col'>
							
							</Col>
							<Col className='col'>
							
							</Col>
						</Row> */}
						{/* <div className='col-5'></div> */}
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Home;
