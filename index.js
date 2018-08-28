import { Provider } from 'react-redux';
import Router from './app/router';
import { registerScreens } from './app/screens';
import store from './app/Store';
const state = store.getState();
const {
	account: { token }
} = state;

GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

registerScreens(store, Provider);

if (!token) {
	Router.logIn();
} else {
	Router.startApp();
}
