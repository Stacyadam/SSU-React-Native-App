import { SAVE_MEMBERCARDS } from '../types';

export default (state = {}, action = {}) => {
	switch (action.type) {
		case SAVE_MEMBERCARDS: {
			return {
				...state,
				memberCards: action.payload
			};
		}
		default:
			return state;
	}
};
