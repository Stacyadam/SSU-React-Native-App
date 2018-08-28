import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import UiSettings from '../../config/UiSettings';

const { greyFour, blue, errorRed } = UiSettings.styles.colors;

class Input extends PureComponent {
	/*============================================================
	 == Render Methods
	/============================================================*/

	render() {
		const { style, ...others } = this.props;
		return (
			<View>
				<Text style={[styles.label, this.getColor()]}>{this.renderLabelOrHelp()}</Text>
				<View style={[styles.container, style]}>
					<TextInput
						autoCapitalize="none"
						autoCorrect={false}
						style={[styles.input]}
						underlineColorAndroid="transparent"
						{...others}
					/>
				</View>
			</View>
		);
	}

	/*============================================================
	 == Methods
	/============================================================*/
	renderLabelOrHelp() {
		const { error } = this.props;
		if (!error) {
			return this.props.label;
		}
		return error;
	}

	getColor() {
		const { error } = this.props;
		if (!error) {
			return {
				color: blue
			};
		}
		return { color: errorRed };
	}
}

/*============================================================
 == Styles
/============================================================*/

const styles = StyleSheet.create({
	container: {
		padding: 10,
		borderWidth: 1,
		borderColor: blue
	},
	label: {
		fontSize: 12,
		marginLeft: 6,
		marginBottom: 4
	}
});

/*============================================================
 == Prop Types
/============================================================*/

Input.propTypes = {};

export default Input;
