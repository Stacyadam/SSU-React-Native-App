import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Reducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

export const defaultState = {
	account: {
		user: null,
		token: null,
		step: 1,
		isSigningUp: false
	},
	giftPacks: {
		availableGiftPacks: [],
		userGiftPacks: []
	},
	memberCards: [],
	global: {
		errors: null,
		loading: false,
		refreshing: false
	}
};

const store = __DEV__
	? createStore(Reducers, defaultState, composeWithDevTools(applyMiddleware(thunk)))
	: createStore(Reducers, defaultState, applyMiddleware(thunk));
export default store;
