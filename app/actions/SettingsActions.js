import { saveUser } from './AccountActions';
import * as GlobalActions from './GlobalActions';
import api from '../utilities/api';

export function updateUser(user) {
	return async (dispatch, getState) => {
		const {
			account: { token }
		} = getState();
		try {
			dispatch(GlobalActions.toggleLoading(true));
			const { data } = await api.patch(`/users/${user.id}`, user, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			dispatch(saveUser(data));
			dispatch(GlobalActions.updateErrors(null));
			dispatch(GlobalActions.toggleLoading(false));
			return true;
		} catch (e) {
			const {
				data: { errors }
			} = e.response;
			dispatch(GlobalActions.updateErrors(errors));
			dispatch(GlobalActions.toggleLoading(false));

			return false;
		}
	};
}
