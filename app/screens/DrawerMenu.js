import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity, Image, Linking } from 'react-native';
import UiSettings from '../config/UiSettings';
import Divider from '../components/shared/Divider';
import { signOut } from '../actions/AccountActions';

const { greyThree, greyFive } = UiSettings.styles.colors;

class DrawerMenu extends Component {
	render() {
		const DrawerWrapper = ({ children }) => <View style={{ padding: 20 }}>{children}</View>;
		const DrawerMenuSection = ({ children }) => <View style={{ paddingHorizontal: 20 }}>{children}</View>;
		const DrawerMenuItem = ({ children, onPress, style }) => (
			<TouchableOpacity onPress={() => onPress()} style={[style]}>
				<Text style={{ color: greyFive, fontSize: 18 }}>{children}</Text>
			</TouchableOpacity>
		);
		return (
			<View>
				<Image
					source={require('../assets/drawer_menu_banner.jpg')}
					style={{ height: 128, width: '100%' }}
					resizeMode="contain"
				/>
				<DrawerWrapper>
					<DrawerMenuSection>
						<DrawerMenuItem onPress={() => this.goToHome()} style={{ marginBottom: 20 }}>
							Home
						</DrawerMenuItem>
						<DrawerMenuItem onPress={() => this.goToGiftPacks()} style={{ marginBottom: 20 }}>
							Gift Packs
						</DrawerMenuItem>
						<DrawerMenuItem onPress={() => this.goToSettings()}>Settings</DrawerMenuItem>
					</DrawerMenuSection>
					<Divider color={greyThree} marginVertical={20} width={2.5} />
					<DrawerMenuSection>
						<DrawerMenuItem onPress={() => this.goToHelp()} style={{ marginBottom: 20 }}>
							Help
						</DrawerMenuItem>
						<DrawerMenuItem onPress={() => this.goToFAQ()} style={{ marginBottom: 20 }}>
							FAQ
						</DrawerMenuItem>
						<DrawerMenuItem onPress={() => this.goToTerms()} style={{ marginBottom: 20 }}>
							Terms of Use
						</DrawerMenuItem>
						<DrawerMenuItem onPress={() => this.goToPrivacy()}>Privacy Policy</DrawerMenuItem>
					</DrawerMenuSection>
					<Divider color={greyThree} marginVertical={20} width={2.5} />
					<DrawerMenuSection>
						<DrawerMenuItem onPress={() => this.props.signOut()}>Sign Out</DrawerMenuItem>
					</DrawerMenuSection>
				</DrawerWrapper>
			</View>
		);
	}

	goToHome() {
		this.props.navigator.toggleDrawer({ side: 'left' });
		this.props.navigator.switchToTab({
			tabIndex: 0
		});
	}

	goToGiftPacks() {
		this.props.navigator.toggleDrawer({ side: 'left' });
		this.props.navigator.switchToTab({
			tabIndex: 1
		});
	}

	goToSettings() {
		this.props.navigator.toggleDrawer({ side: 'left' });
		this.props.navigator.switchToTab({
			tabIndex: 2
		});
	}

	goToHelp() {
		this.props.navigator.showModal({ screen: 'SSU.Help' });
	}

	goToFAQ() {
		this.props.navigator.showModal({ screen: 'SSU.FAQ' });
	}

	goToTerms() {
		Linking.openURL('https://www.smallshopsunited.com/terms');
	}

	goToPrivacy() {
		Linking.openURL('https://www.smallshopsunited.com/privacy');
	}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	signOut: async () => {
		const loggedOut = await dispatch(signOut());
		if (loggedOut) {
			ownProps.navigator.toggleDrawer({ side: 'left' });
			ownProps.navigator.showModal({ screen: 'SSU.LogIn' });
		}
	}
});

export default connect(
	null,
	mapDispatchToProps
)(DrawerMenu);
