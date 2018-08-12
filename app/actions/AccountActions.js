import { SIGNUP, LOGIN, LOGOUT } from '../types';

function signUp(token) {
	return {
		type: SIGNUP,
		token
	};
}

function logIn(token) {
	return {
		type: LOGIN,
		token
	};
}

function logOut() {
	return {
		type: LOGOUT
	};
}

const actionCreators = {
	signUp,
	logIn,
	logOut
};

export { actionCreators };
