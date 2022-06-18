import { useState, useContext } from 'react';
import GithubContext from '../../context/github/GithubContext';
import AlertContext from '../../context/alert/AlertContext';
import { searchUsers } from '../../context/github/GithubActions';

const UserSearch = () => {
	const [text, setText] = useState('');

	const { users, dispatch } = useContext(GithubContext);
	const { setAlert } = useContext(AlertContext);

	const handelChange = e => {
		setText(e.target.value);
	};

	const handelSubmit = async e => {
		e.preventDefault();

		if (text === '') {
			setAlert('Please enter name to search 🤨', 'error');
		} else {
			// Show the loading spinner
			dispatch({ type: 'SET_LOADING' });

			// Get the users
			const users = await searchUsers(text);
			dispatch({ type: 'GET_USERS', payload: users });
			setText('');
		}
	};

	const handelClear = () => {
		dispatch({ type: 'CLEAR_USERS' });
	};

	return (
		<div className='grid grid-cols-1 xl:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
			<div className=''>
				<form action='' onSubmit={handelSubmit}>
					<div className='form-control'>
						<div className='relative'>
							<input
								type='text'
								className='w-full pr-40 bg-gray-200 input input-lg text-black'
								placeholder='search'
								value={text}
								onChange={handelChange}
							/>
							<button
								className='absolute top-0 right-0 rounded-l-none w-36 btn btn-lg'
								type='submit'>
								Go
							</button>
						</div>
					</div>
				</form>
			</div>
			{users.length > 0 && (
				<div className=''>
					<button
						className='btn btn-ghost btn-lg'
						onClick={handelClear}>
						Clear
					</button>
				</div>
			)}
		</div>
	);
};

export default UserSearch;
