import { createStore } from 'redux';
import Reducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

defaultState = {
	account: {
		token: null
	}
};

const store = __DEV__
	? createStore(Reducers, defaultState, composeWithDevTools())
	: createStore(Reducers, defaultState);
export default store;
