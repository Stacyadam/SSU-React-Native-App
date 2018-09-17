import { Navigation } from 'react-native-navigation';
const Icon = require('react-native-vector-icons/FontAwesome');
import UiSettings from '../config/UiSettings';

const { orange } = UiSettings.styles.colors;

let settingsIcon;
let homeIcon;
let giftIcon;
class Router {
	_populateIcons = () => {
		return new Promise(function(resolve, reject) {
			Promise.all([
				Icon.getImageSource('cog', 30),
				Icon.getImageSource('home', 30),
				Icon.getImageSource('gift', 30)
			])
				.then(values => {
					settingsIcon = values[0];
					homeIcon = values[1];
					giftIcon = values[2];
					resolve(true);
				})
				.catch(error => {
					console.log(error);
					reject(error);
				})
				.done();
		});
	};

	logIn() {
		Navigation.startSingleScreenApp({
			screen: {
				screen: 'SSU.LogIn',
				title: 'Log In'
			}
		});
	}

	startApp() {
		this._populateIcons()
			.then(() => {
				Navigation.startTabBasedApp({
					tabs: [
						{
							label: 'Home',
							screen: 'SSU.Home',
							icon: homeIcon,
							selectedIcon: homeIcon,
							title: 'Home'
						},
						{
							label: 'Gift Packs',
							screen: 'SSU.Giftpacks',
							icon: giftIcon,
							selectedIcon: giftIcon,
							title: 'Gift Packs'
						},
						{
							label: 'Settings',
							screen: 'SSU.Settings',
							icon: settingsIcon,
							selectedIcon: settingsIcon,
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
							screen: 'SSU.DrawerMenu',
							passProps: {},
							fixedWidth: 500
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
			})
			.catch(error => {
				console.error(error);
			});
	}
}

export default new Router();
