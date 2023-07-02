import React, { Fragment } from 'react';
import { publicRequest, userRequest } from '../../requestMethod';
import { useState, useEffect } from 'react';
import { Input, Modal, Select, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productSlice';

const AddProduct = (props) => {
	const showAddProductModal = props.showAddProductModal;
	const setShowAddProductModal = props.setShowAddProductModal;
	const [price_new, setPrice_new] = useState(null);
	const [price_old, setPrice_old] = useState(null);
	const [productName, setProductName] = useState('');
	const [productDes, setProductDes] = useState('');
	const [stock, setStock] = useState(null);
	const [previewSource, setPreviewSource] = useState('');
	const [dataUrlImage, setDataUrlImage] = useState('');
	let navigate = useNavigate();
	const dispatch = useDispatch();

	const { TextArea } = Input;
	const handleCancel = () => {
		setShowAddProductModal(false);
		setPrice_new(null);
		setPrice_old(null);
		setProductName('');
		setProductDes('');
		setStock(null);
		setDataUrlImage('');
		setPreviewSource('');
	};

	const handleFileInputChange = (e) => {
		const file = e.target.files[0];
		console.log('file', file);
		readPreviewFile(file);
	};
	const readPreviewFile = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setPreviewSource(reader.result);
			setDataUrlImage(reader.result);
		};
	};
	// useEffect(() => {
	// 	dispatch(fetchProducts());
	// }, []);
	const data = {
		name: productName,
		desc: productDes,
		inStock: stock,
		price_old,
		price_new,
		image: dataUrlImage
	};
	// const productAddRequest = async () => {
	// 	try {
	// 		const response = await userRequest.post('/product', data);
	// 		setPreviewSource('');
	// 		setDataUrlImage('');
	// 		// navigate(0);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };
	const handleSubmitForm = async (e) => {
		// e.preventDefault();

		await userRequest.post('/product', data);
		setPreviewSource('');
		setDataUrlImage('');
		setShowAddProductModal(false);
		dispatch(fetchProducts());
		handleCancel();
	};

	return (
		<Fragment>
			<Modal open={showAddProductModal} onOk={handleSubmitForm} onCancel={handleCancel} width={1000}>
				<h2 className='create-product-title'>CREATE PRODUCT</h2>
				<div className='create-product'>
					<div className='row'>
						<div className='col'>
							<div className='form-group'>
								<label>Product Name</label>
								<Input
									required
									size='large'
									className='col'
									value={productName}
									onChange={(e) => setProductName(e.target.value)}
									placeholder='Name'
								/>
							</div>
						</div>
						<div className='col'>
							<div className='form-group'>
								<label>Stock</label>
								<Input
									required
									size='large'
									value={stock}
									type='number'
									onChange={(e) => setStock(e.target.value)}
									placeholder='Stock'
								/>
							</div>
						</div>
					</div>

					<div className='row'>
						<div className='col'>
							<div className='form-group'>
								<label>Price New</label>
								<Input
									required
									size='large'
									value={price_new}
									type='number'
									onChange={(e) => setPrice_new(e.target.value)}
									placeholder='Price New'
								/>
							</div>
						</div>
						<div className='col'>
							<div className='form-group'>
								<label>Price Old</label>
								<Input
									required
									size='large'
									value={price_old}
									type='number'
									onChange={(e) => setPrice_old(e.target.value)}
									placeholder='Price Old'
								/>
							</div>
						</div>
					</div>
					<div className='row'>
						<div className='col'>
							<div className='form-group'>
								<label>Description</label>
								<TextArea
									required
									className='row'
									value={productDes}
									onChange={(e) => setProductDes(e.target.value)}
									placeholder='Description'
								/>
							</div>
						</div>
					</div>

					<div className='row'>
						<div className='col'>
							<div className='form-group'>
								<Typography variant='h6' sx={{ fontWeight: 'normal' }}>
									Image
								</Typography>
								<Input className='inputFile' type='file' onChange={handleFileInputChange} />
							</div>
						</div>
					</div>
					<div className='row'>
						{previewSource ? (
							<img
								alt=''
								width={300}
								height={200}
								style={{ borderRadius: 5, objectFit: 'cover' }}
								src={previewSource}
							/>
						) : null}
					</div>
				</div>
			</Modal>
		</Fragment>
	);
};

export default AddProduct;
