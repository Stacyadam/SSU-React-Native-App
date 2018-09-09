import { combineReducers } from 'redux';
import account from './AccountReducer';
import giftPacks from './GiftpackReducer';
import global from './GlobalReducer';
import settings from './SettingsReducer';

export default combineReducers({
	account,
	giftPacks,
	global,
	settings
});
