import {
	LOGIN,
	LOGOUT,
	SAVE_USER,
	SAVE_TOKEN,
	NEXT_STEP,
	PREV_STEP,
	SET_USER_LOCATION,
	SAVE_PARTIAL_USER,
	SIGNING_UP,
	RESET_STEPS
} from '../types';
import * as GlobalActions from './GlobalActions';
import api from '../utilities/api';
import { AsyncStorage } from 'react-native';

export function signIn(user) {
	return async dispatch => {
		try {
			const {
				data: { token }
			} = await api.post('/auth/login', user);
			dispatch(resetSteps());
			await AsyncStorage.setItem('userToken', token);
			dispatch(saveToken(token));
			dispatch(getUser());
			return token;
		} catch (e) {
			return e;
		}
	};
}

export function getUser() {
	return async dispatch => {
		try {
			const { data } = await api.get('/users/me');
			dispatch(saveUser(data));
		} catch (e) {
			console.log('user retrieval failed');
			return e;
		}
	};
}

export function signOut() {
	return async dispatch => {
		try {
			await api.post('auth/logout');
			dispatch(logOut());
			return true;
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
			await dispatch(signIn(loginInfo));
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
		dispatch(savePartialUser(user));
		dispatch(GlobalActions.updateErrors(null));
		dispatch(nextStep());
	};
}

export function askForHelp(message) {
	return async (dispatch, getState) => {
		const {
			account: {
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
			await api.post('/general-contact', messageWithUser);

			return true;
		} catch (e) {
			return false;
		}
	};
}

export function requestPassword(email) {
	return async () => {
		try {
			await api.post('/request-password-reset', { email });

			return true;
		} catch (e) {
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

export function isSigningUp(bool) {
	return {
		type: SIGNING_UP,
		payload: bool
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

export function resetSteps() {
	return {
		type: RESET_STEPS
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

// export function logOut() {
// 	return async dispatch => {
// 		try {
// 			//await AsyncStorage.removeItem('userToken');
// 			dispatch(GlobalActions.updateErrors(null));
// 			return {
// 				type: LOGOUT
// 			};
// 		} catch (error) {
// 			console.log('error in log out');
// 			return error;
// 		}
// 	};
// }

export function logOut() {
	AsyncStorage.removeItem('userToken');
	return {
		type: LOGOUT
	};
}
