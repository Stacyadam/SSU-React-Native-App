import React, { PureComponent } from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, View } from 'react-native';
import UiSettings from '../../../config/UiSettings';

const { orange } = UiSettings.styles.colors;

class Button extends PureComponent {
	render() {
		const { style, textStyle, spinnerSize, loading, resizeMode, onPress, children } = this.props;
		return (
			<View style={{ justifyContent: 'center', alignItems: 'center' }}>
				<TouchableOpacity onPress={() => onPress()} style={[styles.container, style]}>
					{this.props.loading ? (
						<ActivityIndicator
							size={spinnerSize}
							color="#FFF"
							animating={loading}
							resizeMode={resizeMode}
							style={[styles.spinner]}
						/>
					) : (
						<Text style={[styles.text, textStyle]}>{children}</Text>
					)}
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: orange,
		width: '50%',
		height: 34
	},
	text: {
		color: '#FFF',
		textAlign: 'center',
		fontWeight: 'bold'
	},
	spinner: {
		position: 'absolute',
		top: 0,
		right: 0,
		left: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1
	}
});

export default Button;
