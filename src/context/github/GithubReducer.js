const githubReducer = (state, action) => {
	switch (action.type) {
		case 'GET_USERS':
			return {
				// return the current state
				...state,
				users: action.payload,
				loading: false,
			};
		case 'GET_USER_AND_REPOS':
			return {
				...state,
				user: action.payload.user,
				repos: action.payload.repos,
				loading: false,
			};
		case 'SET_LOADING':
			return {
				...state,
				loading: true,
			};
		case 'CLEAR_USERS':
			return {
				...state,
				users: [],
			};
		// If there is no action, just return the current state
		default:
			return state;
	}
};

export default githubReducer;
