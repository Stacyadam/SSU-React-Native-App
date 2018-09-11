import { SAVE_MEMBERCARDS } from '../types';
import * as GlobalActions from './GlobalActions';
import api from '../utilities/api';

export function getMemberCards() {
	return async (dispatch, getState) => {
		const { token } = getState().account;
		try {
			dispatch(GlobalActions.toggleLoading(true));
			const {
				data: { member_cards }
			} = await api.get(`/users/me?expand[memberCards]=*`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			dispatch(saveMemberCards(member_cards));
			dispatch(GlobalActions.toggleLoading(false));
			return true;
		} catch (e) {
			console.log(e);
			dispatch(GlobalActions.toggleLoading(false));

			return false;
		}
	};
}

export function removeMemberCard(memberCardID) {
	return async (dispatch, getState) => {
		const {
			account: {
				token,
				user: { id }
			}
		} = getState();
		try {
			dispatch(GlobalActions.toggleLoading(true));
			await api.delete(`/users/${id}/member-cards/${memberCardID}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			dispatch(getMemberCards(member_cards));
			return true;
		} catch (e) {
			console.log(e.response);
			dispatch(GlobalActions.toggleLoading(false));

			return false;
		}
	};
}

export function requestMemberCard(userInfo) {
	return async (dispatch, getState) => {
		const {
			token,
			user: { id }
		} = getState().account;
		console.log(userInfo);
		try {
			dispatch(GlobalActions.toggleLoading(true));
			await api.post(`/users/${id}/request-member-card`, userInfo, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
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

export function saveMemberCards(memberCards) {
	return {
		type: SAVE_MEMBERCARDS,
		payload: memberCards
	};
}
