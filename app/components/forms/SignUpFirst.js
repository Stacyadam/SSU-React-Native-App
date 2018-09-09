import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import Input from './Input';
import UiSettings from '../../config/UiSettings';
import SSUIcon from '../shared/icons/SSUIcon';
import Button from '../shared/buttons/Button';
import { validateInput } from '../../actions/AccountActions';

const { orange, greyThree, blue, errorRed } = UiSettings.styles.colors;

class SignUpFirst extends Component {
	state = {
		email: '',
		password: ''
	};

	/*============================================================
	 == Render Methods
	/============================================================*/

	render() {
		return (
			<View
				style={{
					height: '100%'
				}}
			>
				<Text style={{ marginVertical: 20, textAlign: 'center', color: orange, fontSize: 20, lineHeight: 30 }}>
					ONE ACCOUNT
					{'\n'}
					ALL THE BENEFITS
				</Text>

				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						paddingHorizontal: 40,
						marginBottom: 20
					}}
				>
					<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
						<SSUIcon name="check" size={30} color={orange} style={{ marginBottom: 8 }} />
						<Text style={{ textAlign: 'center', fontSize: 14, color: orange }}>SSU LOYALTY</Text>
					</View>
					<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
						<SSUIcon name="gift" size={30} color={blue} style={{ marginBottom: 8 }} />
						<Text style={{ textAlign: 'center', fontSize: 14, color: blue }}>SSU GIFT PACKS</Text>
					</View>
				</View>
				<View style={{ paddingHorizontal: 24 }}>
					{this.props.errors && this.props.errors.email ? (
						<Text style={{ fontSize: 12, marginBottom: 6, color: errorRed }}>
							{this.props.errors.email[0]}
						</Text>
					) : (
						<Text style={{ fontSize: 12, marginBottom: 6, color: blue }}>Email</Text>
					)}
					<View
						style={{
							borderColor: blue,
							borderWidth: 1,
							marginBottom: 10,
							height: 40,
							paddingRight: 20,
							justifyContent: 'center',
							paddingLeft: 10
						}}
					>
						<TextInput
							onChangeText={email => this.setState({ email })}
							value={this.state.email}
							autoCorrect={false}
							autoCapitalize="none"
							keyboardType="email-address"
						/>
					</View>
					<Text style={{ color: orange, marginLeft: 10, marginBottom: 20 }}>
						WE NEVER SELL OR SHARE EMAILS
					</Text>

					{this.props.errors && this.props.errors.password ? (
						<Text style={{ fontSize: 12, marginBottom: 6, color: errorRed }}>
							{this.props.errors.password[0]}
						</Text>
					) : (
						<Text style={{ fontSize: 12, marginBottom: 6, color: blue }}>Password</Text>
					)}
					<View
						style={{
							borderColor: blue,
							borderWidth: 1,
							marginBottom: 20,
							height: 40,
							paddingRight: 20,
							justifyContent: 'center',
							paddingLeft: 10
						}}
					>
						<TextInput
							onChangeText={password => this.setState({ password })}
							value={this.state.password}
							autoCorrect={false}
							autoCapitalize="none"
							secureTextEntry
						/>
					</View>
					<Button
						style={{ marginBottom: 20 }}
						loading={this.props.loading}
						onPress={() =>
							this.props.validateInput({ email: this.state.email, password: this.state.password })
						}
					>
						CONTINUE
					</Button>
					<TouchableOpacity onPress={() => this.props.navigator.dismissModal()}>
						<Text style={{ color: orange, textAlign: 'center', marginBottom: 10 }}>
							ALREADY HAVE AN ACCOUNT?
						</Text>
					</TouchableOpacity>
					<Text style={{ textAlign: 'center', fontSize: 10, color: greyThree }}>
						We send very few marketing emails throughout the year and you have the option to unsubscribe at
						any time.
					</Text>
				</View>
			</View>
		);
	}

	/*============================================================
	 == Methods
	/============================================================*/
}

const mapStateToProps = state => ({
	errors: state.global.errors,
	loading: state.global.loading
});

const mapDispatchToProps = dispatch => ({
	validateInput: data => {
		dispatch(validateInput(data));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SignUpFirst);
