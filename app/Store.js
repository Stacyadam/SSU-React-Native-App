import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Reducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const defaultState = {
	account: {
		user: null,
		token: null,
		step: 1,
		errors: null
	},
	giftPacks: {
		availableGiftPacks: [],
		userGiftPacks: []
	},
	global: {
		errors: null,
		loading: false,
		success: null
	}
};

const store = __DEV__
	? createStore(Reducers, defaultState, composeWithDevTools(applyMiddleware(thunk)))
	: createStore(Reducers, defaultState, applyMiddleware(thunk));
export default store;
