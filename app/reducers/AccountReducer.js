import { AsyncStorage } from 'react-native';
import { SIGNUP, LOGIN, LOGOUT } from '../types';

export default (state = {}, { type }) => {
	switch (type) {
		case SIGNUP:
			return {
				...state,
				token
			};

		case LOGIN:
			return {
				...state,
				token
			};

		case LOGOUT:
			return {
				...state,
				token
			};

		default:
			return state;
	}
};
