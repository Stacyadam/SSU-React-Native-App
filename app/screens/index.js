import { Navigation } from 'react-native-navigation';

import Giftpacks from './Giftpacks';
import Settings from './Settings';
import SignIn from './SignIn';

export function registerScreens(store, Provider) {
	//Navigation.registerComponent('SSU.News', () => FirstTabScreen);
	//Navigation.registerComponent('SSU.Loyalty', () => SecondTabScreen);
	Navigation.registerComponent('SSU.Giftpacks', () => Giftpacks, store, Provider);
	Navigation.registerComponent('SSU.SignIn', () => SignIn, store, Provider);
	Navigation.registerComponent('SSU.Settings', () => Settings, store, Provider);
}
