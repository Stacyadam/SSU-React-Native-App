import { LOADING, ERRORS } from '../types';

export default (state = {}, action = {}) => {
	switch (action.type) {
		case LOADING: {
			return {
				...state,
				loading: action.payload
			};
		}

		case ERRORS:
			return {
				...state,
				errors: action.payload
			};

		default:
			return state;
	}
};
