import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity, Image, Linking } from 'react-native';
import Router from '../router';
import UiSettings from '../config/UiSettings';
import Divider from '../components/shared/Divider';
import SSUIcon from '../components/shared/icons/SSUIcon';
import { signOut } from '../actions/AccountActions';

const { greyThree, greyFive } = UiSettings.styles.colors;

class DrawerMenu extends Component {
	render() {
		const DrawerWrapper = ({ children }) => <View style={{ padding: 20 }}>{children}</View>;
		const DrawerMenuSection = ({ children }) => <View style={{ paddingHorizontal: 20 }}>{children}</View>;
		const DrawerMenuItem = ({ children, onPress, style, icon, size }) => (
			<TouchableOpacity
				onPress={() => onPress()}
				style={[style, { flexDirection: 'row', alignItems: 'flex-end' }]}
			>
				<SSUIcon
					name={icon}
					size={size || 22}
					color={greyFive}
					style={{ marginRight: 8, alignSelf: 'flex-start' }}
				/>
				<Text style={{ fontFamily: 'Omnes-Regular', color: greyFive, fontSize: 18 }}>{children}</Text>
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
						<DrawerMenuItem icon="home" onPress={() => this.goToHome()} style={{ marginBottom: 20 }}>
							Home
						</DrawerMenuItem>
						<DrawerMenuItem icon="gift" onPress={() => this.goToGiftPacks()} style={{ marginBottom: 20 }}>
							Gift Packs
						</DrawerMenuItem>
						<DrawerMenuItem icon="cog" onPress={() => this.goToSettings()}>
							Settings
						</DrawerMenuItem>
					</DrawerMenuSection>
					<Divider color={greyThree} marginVertical={20} width={2.5} />
					<DrawerMenuSection>
						<DrawerMenuItem
							icon="question-circle"
							onPress={() => this.goToHelp()}
							style={{ marginBottom: 20 }}
						>
							Help
						</DrawerMenuItem>
						<DrawerMenuItem icon="info-circle" onPress={() => this.goToFAQ()} style={{ marginBottom: 20 }}>
							FAQ
						</DrawerMenuItem>
						<DrawerMenuItem
							icon="file"
							size={18}
							onPress={() => this.goToTerms()}
							style={{ marginBottom: 20 }}
						>
							Terms of Use
						</DrawerMenuItem>
						<DrawerMenuItem icon="unlock-alt" onPress={() => this.goToPrivacy()}>
							Privacy Policy
						</DrawerMenuItem>
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

const mapDispatchToProps = dispatch => ({
	signOut: async () => {
		const loggedOut = await dispatch(signOut());
		if (loggedOut) {
			Router.logIn();
		}
	}
});

export default connect(
	null,
	mapDispatchToProps
)(DrawerMenu);
