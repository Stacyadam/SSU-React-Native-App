import { LOADING, ERRORS, SUCCESS, REFRESHING } from '../types';

export default (state = {}, action = {}) => {
	switch (action.type) {
		case LOADING: {
			return {
				...state,
				loading: action.payload
			};
		}
		case REFRESHING: {
			return {
				...state,
				refreshing: action.payload
			};
		}
		case SUCCESS:
			return {
				...state,
				success: action.payload
			};

		case ERRORS:
			return {
				...state,
				errors: action.payload
			};

		default:
			return state;
	}
};
