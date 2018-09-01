import { Navigation } from 'react-native-navigation';
import UiSettings from '../config/UiSettings';

const { orange } = UiSettings.styles.colors;

class Router {
	logIn() {
		Navigation.startSingleScreenApp({
			screen: {
				screen: 'SSU.LogIn',
				title: 'Log In'
			}
		});
	}

	startApp() {
		Navigation.startTabBasedApp({
			tabs: [
				{
					label: 'Home',
					screen: 'SSU.Home',
					title: 'Home'
				},
				{
					label: 'Gift Packs',
					screen: 'SSU.Giftpacks',
					title: 'Gift Packs'
				},
				{
					label: 'Settings',
					screen: 'SSU.Settings',
					title: 'Settings'
				}
			],
			appStyle: {
				forceTitlesDisplay: true,
				orientation: 'portrait',
				statusBarTextColorScheme: 'light'
			},
			tabsStyle: {
				tabBarSelectedButtonColor: orange,
				tabBarSelectedLabelColor: orange
			},
			drawer: {
				left: {
					// optional, define if you want a drawer from the left
					screen: 'SSU.DrawerMenu', // unique ID registered with Navigation.registerScreen
					passProps: {}, // simple serializable object that will pass as props to all top screens (optional),
					fixedWidth: 500 // a fixed width you want your left drawer to have (optional)
				},
				style: {
					// ( iOS only )
					drawerShadow: false, // optional, add this if you want a side menu drawer shadow
					contentOverlayColor: 'rgba(0,0,0,0.25)', // optional, add this if you want a overlay color when drawer is open
					leftDrawerWidth: 60, // optional, add this if you want a define right drawer width (50=percent)
					shouldStretchDrawer: true // optional, iOS only with 'MMDrawer' type, whether or not the panning gesture will “hard-stop” at the maximum width for a given drawer side, default : true
				},
				type: 'MMDrawer', // optional, iOS only, types: 'TheSideBar', 'MMDrawer' default: 'MMDrawer'
				animationType: 'parallax', //optional, iOS only, for MMDrawer: 'door', 'parallax', 'slide', 'slide-and-scale'
				// for TheSideBar: 'airbnb', 'facebook', 'luvocracy','wunder-list'
				disableOpenGesture: true // optional, can the drawer be opened with a swipe instead of button
			}
		});
	}
}

export default new Router();
