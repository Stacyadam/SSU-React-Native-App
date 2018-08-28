import { SIGNUP, LOGIN, LOGOUT, ERRORS, SAVE_USER, SAVE_TOKEN, NEXT_STEP, PREV_STEP, NEW_USER } from '../types';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

export function signIn(user) {
	return async dispatch => {
		try {
			const {
				data: { token }
			} = await axios.post('https://dev-api.smallshopsunited.com/v4/auth/login', user);
			dispatch(saveToken(token));
			dispatch(getUser(token));
			dispatch(updateErrors(null));
			return token;
		} catch (e) {
			const {
				data: { errors, message }
			} = e.response;
			if (errors) {
				dispatch(updateErrors(errors));
				return errors;
			} else {
				dispatch(updateErrors(message));
				return message;
			}
		}
	};
}

export function getUser(token) {
	return async dispatch => {
		try {
			const { data } = await axios.get('https://dev-api.smallshopsunited.com/v4/users/me', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			dispatch(saveUser(data));
		} catch (e) {
			console.log('user retrieval failed');
		}
	};
}

export function signUp(userInfo) {
	return async dispatch => {
		try {
			const newUser = await axios.post('https://dev-api.smallshopsunited.com/v4/website-user-sign-up', userInfo);

			const { email, password } = userInfo;

			dispatch(sendNewUser(newUser.data));
			dispatch(signIn({ email, password }));

			return newUser;
		} catch (e) {
			const {
				data: { errors }
			} = e.response;
			dispatch(updateErrors(errors));
			return e;
		}
	};
}

export function validateInput(data) {
	return async dispatch => {
		try {
			const success = await axios.post('https://dev-api.smallshopsunited.com/v4/website-user-sign-up', data);

			return success;
		} catch (e) {
			const {
				data: { errors }
			} = e.response;
			const inputTypes = Object.keys(data);
			const valid = inputTypes.every(input => !errors.hasOwnProperty(input));
			if (valid) {
				dispatch(saveUser(data));
				dispatch(updateErrors(null));
				dispatch(nextStep());
			} else {
				dispatch(updateErrors(errors));
			}
			return e;
		}
	};
}

export function nextStep() {
	return {
		type: NEXT_STEP
	};
}

export function prevStep() {
	return {
		type: PREV_STEP
	};
}

export function updateErrors(errors) {
	return {
		type: ERRORS,
		payload: errors
	};
}

export function saveToken(token) {
	return {
		type: SAVE_TOKEN,
		payload: token
	};
}

export function sendNewUser(user) {
	return {
		type: NEW_USER,
		payload: user
	};
}

export function saveUser(user) {
	return {
		type: SAVE_USER,
		payload: user
	};
}

export function logIn(user) {
	return {
		type: LOGIN,
		user
	};
}

export function logOut() {
	return {
		type: LOGOUT
	};
}
