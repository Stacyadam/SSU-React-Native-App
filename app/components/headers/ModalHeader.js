import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import SSUIcon from '../shared/icons/SSUIcon';
import UiSettings from '../../config/UiSettings';

const { orange } = UiSettings.styles.colors;

class ModalHeader extends Component {
	render() {
		const { title, navigator, onBack } = this.props;
		return (
			<View style={[styles.container]}>
				<TouchableOpacity
					onPress={() => (onBack ? onBack() : navigator.dismissAllModals())}
					style={[styles.backWrapper]}
				>
					<SSUIcon name="angle-left" color="#FFF" size={26} />
				</TouchableOpacity>
				<Text style={[styles.titleText]}>{title}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: 64,
		backgroundColor: orange,
		paddingTop: 10
	},
	backWrapper: {
		position: 'absolute',
		left: 16,
		top: 26
	},
	titleText: {
		color: '#FFF',
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'center',
		width: '80%'
	}
});

export default ModalHeader;
