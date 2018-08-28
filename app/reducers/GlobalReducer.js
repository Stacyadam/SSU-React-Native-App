import { LOADING } from '../types';

export default (state = {}, action = {}) => {
	switch (action.type) {
		case LOADING: {
			return {
				...state,
				loading: action.payload
			};
		}

		default:
			return state;
	}
};
