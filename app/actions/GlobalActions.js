import { LOADING } from '../types';

export function toggleLoading(bool) {
	return {
		type: LOADING,
		payload: bool
	};
}
