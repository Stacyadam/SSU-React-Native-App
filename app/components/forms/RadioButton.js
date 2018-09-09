import React, { Component } from 'react';
import { View, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native';
import UiSettings from '../../config/UiSettings';

const { darkBlue } = UiSettings.styles.colors;

class RadioButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: this.props.selected
		};
	}

	render() {
		return (
			<TouchableWithoutFeedback onPress={() => this._select()}>
				<View
					style={[
						{ alignItems: 'center', flexDirection: 'row', opacity: this.props.disabled ? 0.4 : 1 },
						this.props.style
					]}
				>
					<View style={this._getCircleStyles()}>
						{this.props.checked && <View style={this._getInnerCircleStyles()} />}
					</View>
					<View>{this.props.children}</View>
				</View>
			</TouchableWithoutFeedback>
		);
	}

	_getCircleStyles() {
		let { checked, color, size } = this.props;
		return {
			alignItems: 'center',
			borderColor: color,
			borderWidth: checked ? 2 : 1,
			borderRadius: size / 2,
			height: size,
			justifyContent: 'center',
			marginRight: 6,
			width: size
		};
	}

	_getInnerCircleStyles() {
		let { size, backgroundColor } = this.props;
		return {
			backgroundColor: backgroundColor,
			borderRadius: (size - 4) / 2,
			height: size - size / 5,
			width: size - size / 5
		};
	}

	_select() {
		if (this.props.disabled) return null;
		if (this.props.onPress) this.props.onPress();
	}
}

RadioButton.defaultProps = {
	color: darkBlue,
	backgroundColor: darkBlue,
	size: 30
};

export default RadioButton;
