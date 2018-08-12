// import React from 'react';
// import { StackNavigator, TabNavigator, SwitchNavigator } from 'react-navigation';

// import SignUp from '../screens/SignUp';
// import SignIn from '../screens/SignIn';
// import Giftpacks from '../screens/Giftpacks';
// import Settings from '../screens/Settings';

// export const SignedOut = StackNavigator({
// 	SignUp: {
// 		screen: SignUp,
// 		navigationOptions: {
// 			title: 'Sign Up'
// 		}
// 	},
// 	SignIn: {
// 		screen: SignIn,
// 		navigationOptions: {
// 			title: 'Sign In'
// 		}
// 	}
// });

// export const SignedIn = TabNavigator({
// 	GiftPacks: {
// 		screen: GiftPacks,
// 		navigationOptions: {
// 			tabBarLabel: 'Gift Packs'
// 		}
// 	},
// 	Settings: {
// 		screen: Settings,
// 		navigationOptions: {
// 			tabBarLabel: 'Settings'
// 		}
// 	}
// });

// export const createRootNavigator = (signedIn = false) => {
// 	return SwitchNavigator(
// 		{
// 			SignedIn: {
// 				screen: SignedIn
// 			},
// 			SignedOut: {
// 				screen: SignedOut
// 			}
// 		},
// 		{
// 			initialRouteName: signedIn ? 'SignedIn' : 'SignedOut'
// 		}
// 	);
// };
