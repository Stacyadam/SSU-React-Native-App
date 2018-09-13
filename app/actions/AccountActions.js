import {
	LOGIN,
	LOGOUT,
	SAVE_USER,
	SAVE_TOKEN,
	NEXT_STEP,
	PREV_STEP,
	SET_USER_LOCATION,
	SAVE_PARTIAL_USER
} from '../types';
import * as GlobalActions from './GlobalActions';
import api from '../utilities/api';
import { AsyncStorage } from "react-native"

export function signIn(user) {
	return async dispatch => {
		try {
			dispatch(GlobalActions.toggleLoading(true));
			const {
				data: { token }
			} = await api.post('/auth/login', user);

			AsyncStorage.setItem('userToken', token);

			dispatch(saveToken(token));
			dispatch(getUser(token));
			dispatch(GlobalActions.updateErrors(null));
			dispatch(GlobalActions.toggleLoading(false));						

			return token;
		} catch (e) {
			const {
				data: { errors, message }
			} = e.response;
			if (errors) {
				dispatch(GlobalActions.updateErrors(errors));
				dispatch(GlobalActions.toggleLoading(false));
				return errors;
			} else {
				dispatch(GlobalActions.updateErrors(message));
				dispatch(GlobalActions.toggleLoading(false));
				return message;
			}
		}
	};
}

export function getUser(token) {
	return async dispatch => {
		try {
			const { data } = await api.get('/users/me', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			dispatch(saveUser(data));
		} catch (e) {
			console.log('user retrieval failed');
			return e;
		}
	};
}

export function signOut() {
	return async (dispatch, getState) => {
		const {
			account: { token }
		} = getState();

		try {
			dispatch(GlobalActions.toggleLoading(true));
			const res = await api.post('auth/logout', null, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			AsyncStorage.removeItem('userToken');
			dispatch(logOut());
			dispatch(GlobalActions.toggleLoading(false));
			return res;
		} catch (e) {
			return e;
		}
	};
}

export function signUp(userInfo) {
	return async dispatch => {
		try {
			dispatch(GlobalActions.toggleLoading(true));
			const { data } = await api.post('/website-user-sign-up', userInfo);

			const { email, password } = userInfo;
			loginInfo = { email, password };

			dispatch(saveUser(data));
			const success = await dispatch(signIn(loginInfo));
			if (success) dispatch(prevStep(true));
			dispatch(GlobalActions.toggleLoading(false));
			return data;
		} catch (e) {
			const {
				data: { errors }
			} = e.response;
			dispatch(GlobalActions.updateErrors(errors));
			dispatch(GlobalActions.toggleLoading(false));
			return e;
		}
	};
}

export function validateInput(data) {
	return async dispatch => {
		try {
			dispatch(GlobalActions.toggleLoading(true));
			const success = await api.post('/website-user-sign-up', data);
			dispatch(GlobalActions.toggleLoading(false));
			return success;
		} catch (e) {
			const { errors } = e.response.data;

			const inputTypes = Object.keys(data);
			const valid = inputTypes.every(input => !errors.hasOwnProperty(input));

			if (valid) {
				dispatch(advanceSignUp(data));
				dispatch(GlobalActions.toggleLoading(false));
			} else {
				dispatch(GlobalActions.updateErrors(errors));
				dispatch(GlobalActions.toggleLoading(false));
			}
			return e;
		}
	};
}

export function advanceSignUp(user) {
	return dispatch => {
		console.log(user);
		dispatch(savePartialUser(user));
		dispatch(GlobalActions.updateErrors(null));
		dispatch(nextStep());
	};
}

export function askForHelp(message) {
	return async (dispatch, getState) => {
		const {
			account: {
				token,
				user: { first_name, last_name, email, phone }
			}
		} = getState();

		const messageWithUser = {
			first_name,
			last_name,
			email,
			phone,
			message
		};

		try {
			dispatch(GlobalActions.toggleLoading(true));
			await api.post('/general-contact', messageWithUser, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			dispatch(GlobalActions.toggleLoading(false));
			dispatch(GlobalActions.updateErrors(null));
			return true;
		} catch (e) {
			const { errors } = e.response.data;
			dispatch(GlobalActions.updateErrors(errors));
			dispatch(GlobalActions.toggleLoading(false));
			return false;
		}
	};
}

export function requestPassword(email) {
	return async dispatch => {
		try {
			dispatch(GlobalActions.toggleLoading(true));
			await api.post('/request-password-reset', { email });
			dispatch(GlobalActions.toggleLoading(false));
			dispatch(GlobalActions.updateErrors(null));
			return true;
		} catch (e) {
			const { errors } = e.response.data;
			dispatch(GlobalActions.updateErrors(errors));
			dispatch(GlobalActions.toggleLoading(false));
			return false;
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

export function savePartialUser(user) {
	return {
		type: SAVE_PARTIAL_USER,
		payload: user
	};
}

export function nextStep() {
	return {
		type: NEXT_STEP
	};
}

export function prevStep(reset = false) {
	return {
		type: PREV_STEP,
		...(reset && { payload: { reset } })
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
