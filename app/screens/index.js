import { Navigation } from 'react-native-navigation';

import Giftpacks from './Giftpacks';
import Settings from './Settings';
import Home from './Home';
import DrawerMenu from './DrawerMenu';
import LogIn from './LogIn';
import CouponDetailsModal from './CouponDetailsModal';

export function registerScreens(store, Provider) {
	//Navigation.registerComponent('SSU.News', () => FirstTabScreen);
	//Navigation.registerComponent('SSU.Loyalty', () => SecondTabScreen);
	Navigation.registerComponent('SSU.LogIn', () => LogIn, store, Provider);
	Navigation.registerComponent('SSU.Home', () => Home, store, Provider);
	Navigation.registerComponent('SSU.Giftpacks', () => Giftpacks, store, Provider);
	Navigation.registerComponent('SSU.Settings', () => Settings, store, Provider);
	Navigation.registerComponent('SSU.DrawerMenu', () => DrawerMenu, store, Provider);
	Navigation.registerComponent('SSU.CouponDetailsModal', () => CouponDetailsModal, store, Provider);
}
