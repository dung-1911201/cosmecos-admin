import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { getUsers, userRegister } from '../../redux/slices/userSlice';
const CreateUser = () => {
	let navigate = useNavigate();
	const dispatch = useDispatch();
	const [errorText, setErrorText] = useState('');
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm();
	const onSubmit = (data, e) => {
		e.preventDefault();
		const { userName, email, password, rePassword } = data;
		if (password !== rePassword) {
			setErrorText('Mật khẩu không khớp !');
			return;
		}
		if (password === rePassword) {
			dispatch(userRegister({ userName, email, password }));
			alert("Register Success ! Now,Let's login with your account !");
			navigate('/users');
		}
	};
	return (
		<div className='login-container'>
			<div className='login-wraper'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<h1>Register</h1>
					<div>
						<label htmlFor=''>
							Your name<span>*</span>
						</label>
						<span className='register-error'>
							{errors.userName?.type === 'required' && 'username is require!'}
						</span>
						<span className='register-error'>
							{errors.userName?.type === 'minLength' && 'username must be least 8 character!'}
						</span>
						<input
							name='userName'
							type='text'
							placeholder='Your name'
							{...register('userName', { required: true, minLength: 8 })}
						/>
					</div>
					<div>
						<label htmlFor=''>
							Your email<span>*</span>
						</label>
						<span className='register-error'>
							{errors.email?.type === 'required' && 'email is required!'}
						</span>
						<span className='register-error'>
							{errors.email?.type === 'pattern' && 'email is invalid!'}
						</span>
						<input
							name='email'
							type='email'
							placeholder='Your email'
							{...register('email', {
								required: true,
								pattern: /^[A-Z0-9 ._%+-]+@[A-Z0-9 .-]+\.[A-Z]{2,}$/i
							})}
						/>
					</div>
					<div>
						<label htmlFor=''>
							Password<span>*</span>
						</label>
						<span className='register-error'>
							{errors.password?.type === 'required' && 'password is required!'}
						</span>
						<span className='register-error'>
							{errors.password?.type === 'minLength' && 'password must be least 8 character!'}
						</span>
						<input
							name='password'
							type='password'
							placeholder='password'
							{...register('password', { required: true, minLength: 8 })}
						/>
					</div>
					<div>
						<label htmlFor=''>
							Re-password<span>*</span>
						</label>
						<span className='register-error'>{errorText}</span>
						<span className='register-error'>
							{errors.rePassword?.type === 'required' && 're-password is required!'}
						</span>
						<span className='register-error'>
							{errors.rePassword?.type === 'minLength' && 're-password must be least 8 character!'}
						</span>
						<input
							name='rePassword'
							type='password'
							placeholder='re-password'
							{...register('rePassword', { required: true, minLength: 8 })}
						/>
					</div>
					<div>
						<button>Register</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateUser;
