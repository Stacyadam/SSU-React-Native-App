import { Provider } from 'react-redux';
import Router from './app/router';
import { registerScreens } from './app/screens';
import store from './app/Store';
import { getUser, saveToken, logOut } from './app/actions/AccountActions';
import { AsyncStorage } from 'react-native';
import { isTokenValid } from './app/utilities';

GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

registerScreens(store, Provider);

const startApp = async () => {
	try {
		const token = await AsyncStorage.getItem('userToken');
		const validToken = isTokenValid(token);

		if (token === null) {
			Router.logIn();
		} else if (token !== null && validToken) {
			store.dispatch(saveToken(token));
			store.dispatch(getUser(token));
			Router.startApp();
		} else if (token !== null && !validToken) {
			store.dispatch(logOut());
		}
		return token;
	} catch (error) {
		console.log('this is the error', error);
		return error;
	}
};

startApp();
