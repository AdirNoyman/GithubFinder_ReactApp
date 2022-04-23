import React from 'react';
import spinner from './assets/spinner.gif';

const Spinner = () => {
	return (
		<div class='w-100 mt-20'>
			<img
				className='text-center mx-auto'
				width={180}
				src={spinner}
				alt='loading spinner'
			/>
		</div>
	);
};

export default Spinner;
