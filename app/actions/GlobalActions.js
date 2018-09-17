import { LOADING, ERRORS, SUCCESS, REFRESHING } from '../types';

export function toggleLoading(bool) {
	return {
		type: LOADING,
		payload: bool
	};
}

export function toggleRefreshing(bool) {
	return {
		type: REFRESHING,
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
