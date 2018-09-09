import {
	SIGNUP,
	LOGIN,
	LOGOUT,
	NEW_USER,
	SAVE_USER,
	SAVE_TOKEN,
	NEXT_STEP,
	PREV_STEP,
	SET_USER_LOCATION,
	SAVE_PARTIAL_USER
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
			const { id, email, phone, first_name, last_name, birthday, gender, zip_code, full_name } = action.payload;

			return {
				...state,
				user: {
					id,
					email,
					phone,
					first_name,
					last_name,
					birthday,
					gender,
					zip_code,
					full_name
				}
			};
		}

		case SAVE_PARTIAL_USER: {
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
				...(action.payload.reset ? { step: state.step - 2 } : { step: state.step - 1 })
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
