import React, { useEffect } from 'react';
import { useNavigate, NavLink, Outlet, Link } from 'react-router-dom';
import { DashboardOutlined, NotificationOutlined, TabletOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Typography, Input, Row, Col } from 'antd';
import { MailOutlined, LogoutOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { getUsers, getUserStat, userLogout } from '../../redux/slices/userSlice';
import Featured from '../../components/featured/Featured';
import ListUser from '../../components/listUser/ListUser';
import UserChart from '../../components/chart/UserChart';
import Home from '../home/Home';
const { Header, Content, Sider } = Layout;
const { Search } = Input;

const { Title } = Typography;
const LayoutAdmin = () => {
	const dispatch = useDispatch();
	let navigate = useNavigate();

	const handleLogout = () => {
		dispatch(userLogout());
		navigate('/login');
	};

	useEffect(() => {
		dispatch(getUsers());
		dispatch(getUserStat());
	}, [dispatch]);
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));
		if (!user || user.isAdmin === false) {
			localStorage.clear();
			navigate('/login');
		}
	}, []);

	// useEffect(() => {

	// }, [dispatch]);
	return (
		<Layout>
			<Header className='header'>
				<Title className='header-admin'>
					<Link to={`/`}>Admin</Link>
				</Title>
				<Search className='header-search' placeholder='input search text' style={{ width: 500 }} />
				<div className='header-right'>
					<MailOutlined />
					<NotificationOutlined />
					<LogoutOutlined onClick={handleLogout} />
				</div>
			</Header>
			<Layout>
				<Sider width={200} className='site-layout-background'>
					<Menu style={{ height: '100%' }}>
						<Menu.Item>
							<NavLink to='/'>
								<DashboardOutlined /> Thống kê
							</NavLink>
						</Menu.Item>
						<Menu.Item>
							<NavLink to='/products'>
								<NotificationOutlined /> Sản phẩm
							</NavLink>
						</Menu.Item>
						<Menu.Item>
							<NavLink to='/order'>
								<TabletOutlined /> Order List
							</NavLink>
						</Menu.Item>
						<Menu.Item>
							<NavLink to='/users'>
								<UserOutlined /> Người dùng
							</NavLink>
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout style={{ padding: '0 24px 24px' }}>
					{/* <Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>Home</Breadcrumb.Item>
						<Breadcrumb.Item>List</Breadcrumb.Item>
						<Breadcrumb.Item>App</Breadcrumb.Item>
					</Breadcrumb> */}
					<Content
						className='site-layout-background'
						style={{
							padding: 24,
							margin: 0,
							minHeight: 280
						}}
					>
						<Outlet />
						{/* <Home /> */}
					</Content>
				</Layout>
			</Layout>
			{/* <Layout>
				<div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
					<Featured />
					<div style={{ marginTop: 5, padding: 5 }}>
						<Row style={{ color: 'black', display: 'flex' }}>
							<Col item sx={{ flex: 1 }}>
								<ListUser />
							</Col>
							<Col item style={{ flex: 1 }}>
								<UserChart />
							</Col>
						</Row>
					</div>
				</div>
			</Layout> */}
		</Layout>
	);
};

export default LayoutAdmin;
