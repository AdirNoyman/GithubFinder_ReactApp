import React from 'react';
import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import GithubContext from '../context/github/GithubContext';

const User = ({ match }) => {
	const { getSingleUser, user } = useContext(GithubContext);

	const params = useParams();

	useEffect(() => {
		getSingleUser(params.name);
	}, []);

	return <div>{user.name}</div>;
};

export default User;
