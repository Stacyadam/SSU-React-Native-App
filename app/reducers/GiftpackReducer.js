import { SAVE_USER_GIFTPACKS, SAVE_GIFTPACK, LOADING } from '../types';

export default (state = {}, action = {}) => {
	switch (action.type) {
		case SAVE_USER_GIFTPACKS: {
			return {
				...state,
				userGiftPacks: action.payload
			};
		}

		case SAVE_GIFTPACK: {
			return {
				...state,
				giftPack: action.payload
			};
		}

		default:
			return state;
	}
};
