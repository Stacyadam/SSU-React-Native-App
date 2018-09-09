import { Navigation } from 'react-native-navigation';

import Giftpacks from './Giftpacks';
import Settings from './Settings';
import Home from './Home';
import DrawerMenu from './DrawerMenu';
import LogIn from '../components/login/LogIn';
import CouponDetailsModal from '../components/giftpacks/CouponDetailsModal';
import LocationHoursModal from '../components/giftpacks/LocationHoursModal';
import SignUpModal from '../components/login/SignUpModal';
import Profile from '../components/settings/Profile';
import MemberCards from '../components/settings/MemberCards';
import Notifications from '../components/settings/Notifications';
import Help from '../components/drawerMenu/Help';
import FAQ from '../components/drawerMenu/FAQ';
import ForgotPassword from '../components/login/ForgotPassword';

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
	Navigation.registerComponent('SSU.Profile', () => Profile, store, Provider);
	Navigation.registerComponent('SSU.MemberCards', () => MemberCards, store, Provider);
	Navigation.registerComponent('SSU.Notifications', () => Notifications, store, Provider);
	Navigation.registerComponent('SSU.Help', () => Help, store, Provider);
	Navigation.registerComponent('SSU.FAQ', () => FAQ, store, Provider);
	Navigation.registerComponent('SSU.ForgotPassword', () => ForgotPassword, store, Provider);
}
