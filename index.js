import { Provider } from 'react-redux';
import Router from './app/router';
import { registerScreens } from './app/screens';
import store from './app/Store';
import { getUser, saveToken } from './app/actions/AccountActions'
import { AsyncStorage } from 'react-native';

GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

registerScreens(store, Provider);

const startApp = async () => {
	try {	
		const token = await AsyncStorage.getItem('userToken');
		if (!token) {
			Router.logIn();
		} else {
			store.dispatch(saveToken(token));
			store.dispatch(getUser(token));
			Router.startApp();
		}						
	} catch (error) {
		console.log('this is the error', error)
	}
}

startApp();
