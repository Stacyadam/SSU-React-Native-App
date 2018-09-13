import { combineReducers } from 'redux';
import { LOGOUT } from '../types';
import account from './AccountReducer';
import giftPacks from './GiftpackReducer';
import global from './GlobalReducer';
import memberCards from './MemberCardReducer';
import settings from './SettingsReducer';
import { defaultState } from '../Store';

const appReducer = combineReducers({
	account,
	giftPacks,
	global,
	memberCards,
	settings
});

export default (state, action) => {
	if (action.type === LOGOUT) {
		state = defaultState;
	}
	return appReducer(state, action);
};