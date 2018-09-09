import { LOADING, ERRORS, SUCCESS } from '../types';

export function toggleLoading(bool) {
	return {
		type: LOADING,
		payload: bool
	};
}

export function updateErrors(errors) {
	return {
		type: ERRORS,
		payload: errors
	};
}

export function updateSuccess(bool) {
	return {
		type: SUCCESS,
		payload: bool
	};
}
