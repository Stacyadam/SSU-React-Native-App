import { SIGNUP, LOGIN, LOGOUT, ERRORS, NEW_USER, SAVE_USER, SAVE_TOKEN, NEXT_STEP, PREV_STEP } from '../types';

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
				...state,
				token
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
