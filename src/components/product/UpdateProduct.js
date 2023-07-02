import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { Input, Modal, Select, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchProducts, updateProduct } from '../../redux/slices/productSlice';

const UpdateProduct = (props) => {
	const dispatch = useDispatch();
	let navigate = useNavigate();
	const productId = props.productId;
	const location = useLocation();
	const singleProduct = props.singleProduct;

	const showUpdateProductModal = props.showUpdateProductModal;
	const setShowUpdateProductModal = props.setShowUpdateProductModal;
	const [price_old, setPrice_old] = useState(singleProduct?.price_old);
	const [price_new, setPrice_new] = useState(singleProduct?.price_new);
	const [productName, setProductName] = useState(singleProduct?.name);
	const [productDes, setProductDes] = useState(singleProduct?.desc);
	const [stock, setStock] = useState(singleProduct?.inStock);
	const [previewSource, setPreviewSource] = useState(singleProduct?.image);
	const [dataUrlImage, setDataUrlImage] = useState('');
	// console.log('singleProduct: ', singleProduct?.name);
	useEffect(() => {
		dispatch(fetchProducts());
	}, []);
	const { TextArea } = Input;
	const handleCancel = () => {
		setShowUpdateProductModal(false);
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
	const handleSubmitForm = async (e) => {
		e.preventDefault();
		const data = {
			name: productName,
			desc: productDes,
			inStock: stock,
			price_new,
			price_old,
			image: dataUrlImage
		};
		await dispatch(updateProduct({ productId, data }));
		navigate(0);
		// handleCancel();
	};

	return (
		<Fragment>
			<Modal open={showUpdateProductModal} onOk={handleSubmitForm} onCancel={handleCancel} width={1000}>
				<h2 className='create-product-title'>UPDATE PRODUCT</h2>
				<div className='create-product'>
					<div className='row'>
						<div className='col'>
							<div className='form-group'>
								<label>Product Name</label>
								<Input
									size='large'
									className='col'
									value={productName}
									defaultValue={singleProduct?.name}
									onChange={(e) => setProductName(e.target.value)}
									placeholder='Name'
								/>
							</div>
						</div>
						<div className='col'>
							<div className='form-group'>
								<label>Stock</label>
								<Input
									size='large'
									defaultValue={singleProduct?.inStock}
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
									size='large'
									defaultValue={singleProduct?.price_new}
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
									size='large'
									defaultValue={singleProduct?.price_old}
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
									className='row'
									defaultValue={singleProduct?.desc}
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

export default UpdateProduct;
