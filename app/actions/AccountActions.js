import { LOGIN, LOGOUT, SAVE_USER, SAVE_TOKEN, NEXT_STEP, PREV_STEP, SET_USER_LOCATION } from '../types';
import * as GlobalActions from './GlobalActions';
import axios from 'axios';

//TODO: make sure all of these are calling GlobalActions.toggleLoading(true) and then toggleLoading(false) after the async request has been finished
export function signIn(user) {
	return async dispatch => {
		try {
			const {
				data: { token }
			} = await axios.post('https://dev-api.smallshopsunited.com/v4/auth/login', user);
			dispatch(saveToken(token));
			dispatch(getUser(token));
			dispatch(GlobalActions.updateErrors(null));
			return token;
		} catch (e) {
			const {
				data: { errors, message }
			} = e.response;
			if (errors) {
				dispatch(GlobalActions.updateErrors(errors));
				return errors;
			} else {
				dispatch(GlobalActions.updateErrors(message));
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
			const { data } = await axios.post('https://dev-api.smallshopsunited.com/v4/website-user-sign-up', userInfo);

			const loginInfo = { email: data.email, password: data.password };
			//TODO: figure out if this is actually returning as expected
			dispatch(saveUser(data));
			dispatch(signIn(loginInfo));

			return data;
		} catch (e) {
			const {
				data: { errors }
			} = e.response;
			dispatch(GlobalActions.updateErrors(errors));
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
				dispatch(advanceSignUp(data));
			} else {
				dispatch(GlobalActions.updateErrors(errors));
			}
			return e;
		}
	};
}

export function setUserLocation(location) {
	return {
		type: SET_USER_LOCATION,
		payload: location
	};
}

export function saveUser(user) {
	return {
		type: SAVE_USER,
		payload: user
	};
}

export function advanceSignUp(user) {
	return dispatch => {
		dispatch(saveUser(user));
		dispatch(GlobalActions.updateErrors(null));
		dispatch(nextStep());
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

export function saveToken(token) {
	return {
		type: SAVE_TOKEN,
		payload: token
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
