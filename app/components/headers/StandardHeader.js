import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import UiSettings from '../../config/UiSettings';

const { orange } = UiSettings.styles.colors;

class StandardHeader extends Component {
	render() {
		const { title, navigator } = this.props;
		const DrawerMenuRow = () => <View style={[styles.drawerMenuRow]} />;
		return (
			<View style={[styles.container]}>
				<TouchableOpacity
					onPress={() => navigator.toggleDrawer({ side: 'left' })}
					style={[styles.drawerWrapper]}
				>
					<DrawerMenuRow />
					<DrawerMenuRow />
					<DrawerMenuRow />
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
	drawerWrapper: {
		position: 'absolute',
		left: 16,
		top: 26
	},
	drawerMenuRow: {
		borderWidth: 2,
		borderColor: '#FFF',
		height: 6,
		marginBottom: 2,
		width: 24
	},
	titleText: {
		color: '#FFF',
		fontSize: 16,
		fontWeight: 'bold'
	}
});

export default StandardHeader;
