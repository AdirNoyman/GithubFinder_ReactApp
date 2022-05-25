import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_API_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
	const initialState = {
		users: [],
		user: {},
		loading: false,
	};

	// dispatch => an action to our reducer
	const [state, dispatch] = useReducer(githubReducer, initialState);

	// Get search results
	const searchUsers = async text => {
		setLoading();

		const querParams = new URLSearchParams({
			q: text,
		});

		const response = await fetch(
			`${GITHUB_URL}/search/users?${querParams}`,
			{
				headers: {
					Authorization: `token ${GITHUB_TOKEN}`,
				},
			}
		);

		const { items } = await response.json();

		dispatch({
			type: 'GET_USERS',
			payload: items,
		});
	};

	// Get a single user from Github
	const getSingleUser = async name => {
		setLoading();

		const response = await fetch(`${GITHUB_URL}/users/${name}`, {
			headers: {
				Authorization: `token ${GITHUB_TOKEN}`,
			},
		});

		if (response.status === 404) {
			// redirect the user to the NotFound page
			window.location = '/notfound';
		} else {
			const data = await response.json();

			dispatch({
				type: 'GET_USER',
				payload: data,
			});
		}
	};

	// Clear users from state
	const clearUsers = () => {
		dispatch({
			type: 'CLEAR_USERS',
		});
	};

	const setLoading = () =>
		dispatch({
			type: 'SET_LOADING',
		});

	return (
		<GithubContext.Provider
			value={{
				users: state.users,
				loading: state.loading,
				user: state.user,
				searchUsers,
				getSingleUser,
				clearUsers,
			}}>
			{children}
		</GithubContext.Provider>
	);
};

export default GithubContext;
