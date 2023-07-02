import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LayoutAdmin from './pages/layout/layoutAdmin';
import Product from './pages/products/Product';
import './assets/css/style.css';
import { useSelector } from 'react-redux';
import UpdateProduct from './components/product/UpdateProduct';
import Login from './pages/login/Login';
import OrderList from './pages/order/OrderList';
import DetailsOrder from './pages/order/DetailsOrder';
import Home from './pages/home/Home';
import UserList from './pages/user/UserList';
import CreateUser from './pages/user/CreateUser';
function App() {
	const { user } = useSelector((state) => state.user);
	return (
		<div className='App'>
			<BrowserRouter>
				{/* {
                	 user && <Sidebar />
                }
                    <div sx={{ width: "80%", marginLeft: "20%" }}>
                      <div sx={{ width: "100%", display: 'flex', flexDirection: 'column' }}>
                        {user &&<Navbar />}
                      </div>
					  </div> */}

				<Routes>
					<Route path='/' element={<LayoutAdmin />}>
						<Route path='/' element={<Home />} />
						<Route path='products' element={<Product />} />
						<Route path='/order' element={<OrderList />} />
						<Route path='/order/details/:id' element={<DetailsOrder />} />
						<Route path='/users' element={<UserList />} />
						<Route path='/user/create' element={<CreateUser />} />

						{/* <Route path='/products/product-update/:id' element={<UpdateProduct />} /> */}
					</Route>
					<Route path='/login' element={<Login />} />
					{/* <Route path='/product/create' element={<CreateProduct />} />
        <Route path='/product/product-update/:id' element={<ProductUpdate />} />
        <Route path='/order' element={<OrderList />} />
        <Route path='/order/details/:id' element={<DetailsOrder />} />
        <Route path='/message' element={<Message />} />
        <Route path='/login' element={<Login />} /> */}
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
