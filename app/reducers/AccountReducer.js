import {
	SIGNUP,
	LOGIN,
	LOGOUT,
	NEW_USER,
	SAVE_USER,
	SAVE_TOKEN,
	NEXT_STEP,
	PREV_STEP,
	SET_USER_LOCATION
} from '../types';

export default (state = {}, action = {}) => {
	switch (action.type) {
		case NEW_USER: {
			return {
				...state,
				user: {
					...state.user,
					...action.payload
				}
			};
		}

		case SAVE_USER: {
			return {
				...state,
				user: {
					...state.user,
					...action.payload
				}
			};
		}

		case SAVE_TOKEN: {
			return {
				...state,
				token: action.payload
			};
		}

		case SET_USER_LOCATION: {
			return {
				...state,
				user: {
					...state.user,
					location: action.payload
				}
			};
		}

		case NEXT_STEP: {
			return {
				...state,
				step: state.step + 1
			};
		}

		case PREV_STEP: {
			return {
				...state,
				step: state.step - 1
			};
		}

		case SIGNUP:
			return {
				...state,
				user: action.newUser
			};

		case LOGIN:
			return {
				...state,
				user
			};

		case LOGOUT:
			return {
				...state
			};

		default:
			return state;
	}
};
