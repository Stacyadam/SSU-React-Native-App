import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import UiSettings from '../../config/UiSettings';

const { greyThree, orange } = UiSettings.styles.colors;

class LocationHoursModal extends Component {
	render() {
		console.log('hours props', this.props);
		return (
			<View>
				<Text>hi</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({});

export default LocationHoursModal;
