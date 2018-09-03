import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import UiSettings from '../config/UiSettings';
import Divider from '../components/shared/Divider';

const { greyThree, greyFive } = UiSettings.styles.colors;

class DrawerMenu extends Component {
	render() {
		const DrawerWrapper = ({ children }) => <View style={{ padding: 20 }}>{children}</View>;
		const DrawerMenuSection = ({ children }) => <View style={{ paddingHorizontal: 20 }}>{children}</View>;
		const DrawerMenuItem = ({ children, style }) => (
			<TouchableOpacity style={[style]}>
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
						<DrawerMenuItem style={{ marginBottom: 20 }}>Home</DrawerMenuItem>
						<DrawerMenuItem style={{ marginBottom: 20 }}>Gift Packs</DrawerMenuItem>
						<DrawerMenuItem>Settings</DrawerMenuItem>
					</DrawerMenuSection>
					<Divider color={greyThree} marginVertical={20} width={2.5} />
					<DrawerMenuSection>
						<DrawerMenuItem style={{ marginBottom: 20 }}>Help</DrawerMenuItem>
						<DrawerMenuItem style={{ marginBottom: 20 }}>FAQ</DrawerMenuItem>
						<DrawerMenuItem style={{ marginBottom: 20 }}>Terms of Use</DrawerMenuItem>
						<DrawerMenuItem>Privacy Policy</DrawerMenuItem>
					</DrawerMenuSection>
					<Divider color={greyThree} marginVertical={20} width={2.5} />
					<DrawerMenuSection>
						<DrawerMenuItem>Sign Out</DrawerMenuItem>
					</DrawerMenuSection>
				</DrawerWrapper>
			</View>
		);
	}
}

const styles = StyleSheet.create({});

export default DrawerMenu;
