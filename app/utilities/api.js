import axios from 'axios';
import { AsyncStorage } from 'react-native';
import store from '../Store';
import { logOut } from '../actions/AccountActions';
import { toggleLoading, updateErrors } from '../actions/GlobalActions';
import Router from '../router';
import { isTokenValid } from '../utilities';

const api = axios.create({
	baseURL: __DEV__ ? 'https://dev-api.smallshopsunited.com/v4/' : 'https://the-qa-api.smallshopsunited.com/v4/',
	timeout: 5000
});

api.interceptors.request.use(
	async config => {
		!store.getState().global.refreshing && store.dispatch(toggleLoading(true));
		try {
			const token = await AsyncStorage.getItem('userToken');
			const validToken = isTokenValid(token);

			if (token !== null && validToken) {
				config.headers['Authorization'] = `Bearer ${token}`;
			} else if (token !== null && !validToken) {
				store.dispatch(logOut());
				!store.getState().global.refreshing && store.dispatch(toggleLoading(false));
				Router.logIn();
			}
			return config;
		} catch (error) {
			store.dispatch(toggleLoading(false));
			console.log('this is the error', error);
			return error;
		}
	},
	error => {
		!store.getState().global.refreshing && store.dispatch(toggleLoading(false));
		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	response => {
		store.dispatch(updateErrors(null));
		!store.getState().global.refreshing && store.dispatch(toggleLoading(false));
		return response;
	},
	error => {
		if (!store.getState().account.isSigningUp) {
			store.dispatch(updateErrors(error.response.data.errors || error.response.data.message));
			!store.getState().global.refreshing && store.dispatch(toggleLoading(false));
		}
		return Promise.reject(error);
	}
);

export default api;
