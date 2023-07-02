import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../../redux/slices/productSlice';
import { Button, Table, Popconfirm, Space } from 'antd';
import AddProduct from '../../components/product/AddProduct';
import UpdateProduct from '../../components/product/UpdateProduct';

const Product = () => {
	const dispatch = useDispatch();
	const { products } = useSelector((state) => state.product);
	useEffect(() => {
		dispatch(fetchProducts());
	}, []);
	let navigate = useNavigate();
	const [productId, setProductId] = useState(null);
	const [showAddProductModal, setShowAddProductModal] = useState(false);
	const [showUpdateProductModal, setShowUpdateProductModal] = useState(false);

	const handleRemoveItem = async (productId) => {
		await dispatch(deleteProduct(productId));
		dispatch(fetchProducts());
		// navigate(0);
	};
	const singleProduct = products.find((item) => {
		return item._id === productId;
	});
	const handleEdit = (id) => {
		setShowUpdateProductModal(true);
		setProductId(id);
	};

	const columns = [
		{
			title: 'ID',
			dataIndex: 'key',
			key: 'key'
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name'
		},
		{
			title: 'Image',
			dataIndex: 'image',
			render: (_, item) => <img alt='' src={`${item.image}`} width={60} height={60} />
		},
		{
			title: 'Desc',
			dataIndex: 'desc',
			key: 'desc'
		},
		{
			title: 'Price New',
			dataIndex: 'price_new',
			key: 'price_new'
		},
		{
			title: 'Price Old',
			key: 'price_old',
			dataIndex: 'price_old'
		},
		{
			title: 'inStock',
			key: 'inStock',
			dataIndex: 'inStock'
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, item) => (
				<Space size='large'>
					<div className='group-action'>
						<Popconfirm
							placement='top'
							title='Bạn có muốn xoá không?'
							onConfirm={() => handleRemoveItem(item.key)}
							okText='Xác nhận xoá'
							cancelText='Cancel'
						>
							<div style={{marginRight:"10px"}}>
								<Button type='primary' danger>
									Remove
								</Button>
							</div>
						</Popconfirm>
						<Button type='primary' onClick={() => handleEdit(item.key)}>
							Edit
						</Button>
					</div>
				</Space>
			)
		}
	];
	return (
		<Fragment>
			<div className='row' style={{marginBottom:"40px"}}>
				<div className='col'>
					<h3 className='pull-left'>Product List</h3>
				</div>

				<Button className='col-2 btn-success' onClick={setShowAddProductModal}>
					Add Product
				</Button>
				<AddProduct showAddProductModal={showAddProductModal} setShowAddProductModal={setShowAddProductModal} />
				<UpdateProduct
					showUpdateProductModal={showUpdateProductModal}
					setShowUpdateProductModal={setShowUpdateProductModal}
					productId={productId}
					singleProduct={singleProduct}
				/>
			</div>
			<Table
				dataSource={products.map((item) => ({
					key: item._id,
					name: item.name,
					desc: item.desc,
					image: item.image,
					price_new: item.price_new,
					price_old: item.price_old,
					inStock: item.inStock
				}))}
				columns={columns}
			/>
		</Fragment>
	);
};

export default Product;
