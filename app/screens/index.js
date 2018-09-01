import { Navigation } from 'react-native-navigation';

import Giftpacks from './Giftpacks';
import Settings from './Settings';
import Home from './Home';
import DrawerMenu from './DrawerMenu';
import LogIn from '../components/login/LogIn';
import CouponDetailsModal from '../components/giftpacks/CouponDetailsModal';
import LocationHoursModal from '../components/giftpacks/LocationHoursModal';
import SignUpModal from '../components/login/SignUpModal';

export function registerScreens(store, Provider) {
	//Navigation.registerComponent('SSU.News', () => FirstTabScreen);
	//Navigation.registerComponent('SSU.Loyalty', () => SecondTabScreen);
	Navigation.registerComponent('SSU.LogIn', () => LogIn, store, Provider);
	Navigation.registerComponent('SSU.SignUpModal', () => SignUpModal, store, Provider);
	Navigation.registerComponent('SSU.Home', () => Home, store, Provider);
	Navigation.registerComponent('SSU.Giftpacks', () => Giftpacks, store, Provider);
	Navigation.registerComponent('SSU.Settings', () => Settings, store, Provider);
	Navigation.registerComponent('SSU.DrawerMenu', () => DrawerMenu, store, Provider);
	Navigation.registerComponent('SSU.CouponDetailsModal', () => CouponDetailsModal, store, Provider);
	Navigation.registerComponent('SSU.LocationHoursModal', () => LocationHoursModal, store, Provider);
}
