import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import UiSettings from '../../config/UiSettings';
import { DotIndicator } from 'react-native-indicators';

class ProgressSpinner extends Component {
	render() {
		if (!this.props.isVisible) return null;
		return (
			<View style={[{ backgroundColor: this.props.backgroundColor }, styles.wrapper]}>
				<View style={{ flex: 1 }}>
					<DotIndicator color={this.props.color} animationDuration={1100} size={this.props.size / 5} />
				</View>
			</View>
		);
	}
}

ProgressSpinner.defaultProps = {
	backgroundColor: 'rgba(255,255,255,0.5)',
	color: UiSettings.styles.colors.darkBlue,
	size: 60,
	thickness: 2,
	isVisible: true
};

const styles = StyleSheet.create({
	wrapper: {
		alignItems: 'center',
		alignSelf: 'stretch',
		flex: 1,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	}
});

export default ProgressSpinner;
