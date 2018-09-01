import { LOADING, ERRORS } from '../types';

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
