import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Divider from '../components/shared/Divider';
import StandardHeader from '../components/headers/StandardHeader';
import UiSettings from '../config/UiSettings';

const { greySix, greyFive } = UiSettings.styles.colors;

class Settings extends Component {
	static navigatorStyle = {
		navBarHidden: true
	};

	render() {
		const Section = ({ title, children, onPress }) => (
			<TouchableOpacity onPress={onPress}>
				<Text
					style={{
						fontFamily: 'Omnes-Regular',
						color: greySix,
						fontSize: 18,
						marginBottom: 4
					}}
				>
					{title}
				</Text>
				<Text style={{ fontFamily: 'Omnes-Regular', color: greySix, fontSize: 16 }}>{children}</Text>
				<Divider color={greyFive} width={2} style={{ marginVertical: 10 }} />
			</TouchableOpacity>
		);

		return (
			<View>
				<StandardHeader title="SETTINGS" navigator={this.props.navigator} />
				<View style={{ paddingLeft: 20, paddingRight: 10, paddingTop: 18 }}>
					<Section onPress={() => this.props.navigator.showModal({ screen: 'SSU.Profile' })} title="Profile">
						View or edit your personal information and contact information
					</Section>
					<Section
						onPress={() => this.props.navigator.showModal({ screen: 'SSU.MemberCards' })}
						title="Member Cards"
					>
						Request, remove, or view the member cards linked to your member account
					</Section>
					{/* V2
						<Section title="Notifications">
						Choose what types of notifications you'd like to receive via email or push notifications
					</Section>
					*/}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({});

export default Settings;
