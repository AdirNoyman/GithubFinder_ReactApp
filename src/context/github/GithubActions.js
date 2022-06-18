import axios from 'axios';
const GITHUB_URL = process.env.REACT_APP_GITHUB_API_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

// Create Axios instance
const github = axios.create({
	baseURL: GITHUB_URL,
	headers: { Authorization: `token ${GITHUB_TOKEN}` },
});

// Get search results
export const searchUsers = async text => {
	const querParams = new URLSearchParams({
		q: text,
	});

	const response = await github.get(`/search/users?${querParams}`);
	return response.data.items;
};

// Get user and his github repositories
export const getUserAndRepos = async login => {
	// Return data from multiple requests (here we have 2 requests)
	const [user, repos] = await Promise.all([
		github.get(`/users/${login}`),
		github.get(`/users/${login}/repos`),
	]);

	return { user: user.data, repos: repos.data };
};

// // Get a single user from Github

// export const getSingleUser = async name => {
// 	const response = await fetch(`${GITHUB_URL}/users/${name}`, {
// 		headers: {
// 			Authorization: `token ${GITHUB_TOKEN}`,
// 		},
// 	});

// 	if (response.status === 404) {
// 		// redirect the user to the NotFound page
// 		window.location = '/notfound';
// 	} else {
// 		const user = await response.json();

// 		return user;
// 	}
// };

// Get user repos
// export const getUserRepos = async login => {
// 	const querParams = new URLSearchParams({
// 		sort: 'created',
// 		per_page: 10,
// 	});

// 	const response = await fetch(
// 		`${GITHUB_URL}/users/${login}/repos?${querParams}`,
// 		{
// 			headers: {
// 				Authorization: `token ${GITHUB_TOKEN}`,
// 			},
// 		}
// 	);

// 	const repos = await response.json();

// 	return repos;
// };
