import { saveUser } from './AccountActions';
import * as GlobalActions from './GlobalActions';
import api from '../utilities/api';

export function updateUser(user) {
	return async dispatch => {
		try {
			const { data } = await api.patch(`/users/${user.id}`, user);

			dispatch(saveUser(data));
			return true;
		} catch (e) {
			return false;
		}
	};
}
