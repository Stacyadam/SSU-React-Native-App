import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { registerScreens } from './app/screens';
import store from './app/Store';

registerScreens(store, Provider);

if (false) {
	Navigation.startTabBasedApp({
		tabs: [
			{
				label: 'Giftpacks',
				screen: 'SSU.Giftpacks',
				title: 'Gift Packs'
			},
			{
				label: 'Settings',
				screen: 'SSU.Settings',
				title: 'Settings'
			}
		]
	});
} else {
	Navigation.startSingleScreenApp({
		screen: {
			screen: 'SSU.SignIn',
			title: 'Sign In'
		}
	});
}
