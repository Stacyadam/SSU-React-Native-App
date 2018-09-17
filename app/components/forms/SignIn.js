import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import Input from './Input';
import UiSettings from '../../config/UiSettings';

const { orange, greyTwo, greyFour } = UiSettings.styles.colors;

class SignIn extends Component {
	state = {
		email: '',
		password: ''
	};

	render() {
		const { onChangeText } = this.props;
		const { email, password } = this.state;
		return (
			<View style={[styles.container]}>
				<View style={[styles.wrapper]}>
					<TextInput
						style={[
							styles.input,
							{
								borderTopLeftRadius: 5,
								borderTopRightRadius: 5
							}
						]}
						onChangeText={input => onChangeText({ email: input })}
						value={email}
						placeholder="Email"
						keyboardType="email-address"
						autoCapitalize="none"
						returnKeyType="done"
					/>
					<TextInput
						style={[
							styles.input,
							{
								borderBottomLeftRadius: 5,
								borderBottomRightRadius: 5
							}
						]}
						onChangeText={input => onChangeText({ password: input })}
						value={password}
						placeholder="Password"
						secureTextEntry
						autoCapitalize="none"
						returnKeyType="done"
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		height: 120,
		margin: 10,
		padding: 10,
		backgroundColor: orange,
		borderRadius: 5
	},
	wrapper: {
		flex: 1,
		backgroundColor: '#FFF',
		borderRadius: 5
	},
	input: {
		fontFamily: 'Omnes-Regular',
		fontSize: 18,
		height: 50,
		borderColor: greyTwo,
		borderWidth: 1,
		paddingLeft: 10,
		color: greyFour
	}
});

export default SignIn;
