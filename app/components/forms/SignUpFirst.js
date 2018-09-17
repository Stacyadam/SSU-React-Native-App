import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Input from './Input';
import UiSettings from '../../config/UiSettings';
import SSUIcon from '../shared/icons/SSUIcon';
import Button from '../shared/buttons/Button';
import { validateInput, isSigningUp } from '../../actions/AccountActions';

const { orange, greyThree, blue, errorRed } = UiSettings.styles.colors;

class SignUpFirst extends Component {
	state = {
		email: '',
		password: ''
	};

	componentDidMount() {
		this.props.isSigningUp(true);
	}

	componentWillUnmount() {
		this.props.isSigningUp(false);
	}

	render() {
		return (
			<KeyboardAwareScrollView
				contentContainerStyle={{ justifyContent: 'space-between', alignItems: 'center', flex: 1 }}
				extraScrollHeight={20}
			>
				<View>
					<Text
						style={{
							fontFamily: 'Omnes-Regular',
							marginVertical: 20,
							textAlign: 'center',
							color: orange,
							fontSize: 20,
							lineHeight: 30
						}}
					>
						ONE ACCOUNT
						{'\n'}
						ALL THE BENEFITS
					</Text>

					<View
						style={{
							flexDirection: 'row',
							width: '70%',
							justifyContent: 'space-between'
						}}
					>
						<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
							<SSUIcon name="check" size={30} color={orange} style={{ marginBottom: 8 }} />
							<Text
								style={{
									fontFamily: 'Omnes-Regular',
									textAlign: 'center',
									fontSize: 14,
									color: orange
								}}
							>
								SSU LOYALTY
							</Text>
						</View>
						<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
							<SSUIcon name="gift" size={30} color={blue} style={{ marginBottom: 8 }} />
							<Text
								style={{ fontFamily: 'Omnes-Regular', textAlign: 'center', fontSize: 14, color: blue }}
							>
								SSU GIFT PACKS
							</Text>
						</View>
					</View>
				</View>

				<View style={{ width: '90%' }}>
					{this.props.errors && this.props.errors.email ? (
						<Text style={{ fontFamily: 'Omnes-Regular', fontSize: 14, marginBottom: 6, color: errorRed }}>
							{this.props.errors.email[0]}
						</Text>
					) : (
						<Text style={{ fontFamily: 'Omnes-Regular', fontSize: 14, marginBottom: 6, color: blue }}>
							Email
						</Text>
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
							onChangeText={email => this.setState({ email })}
							value={this.state.email}
							autoCorrect={false}
							autoCapitalize="none"
							keyboardType="email-address"
							returnKeyType="done"
						/>
					</View>
					<Text
						style={{
							fontFamily: 'Omnes-Regular',
							textAlign: 'center',
							fontSize: 16,
							color: orange,
							marginLeft: 10,
							marginBottom: 20
						}}
					>
						WE NEVER SELL OR SHARE EMAILS
					</Text>

					{this.props.errors && this.props.errors.password ? (
						<Text style={{ fontFamily: 'Omnes-Regular', fontSize: 14, marginBottom: 6, color: errorRed }}>
							{this.props.errors.password[0]}
						</Text>
					) : (
						<Text style={{ fontFamily: 'Omnes-Regular', fontSize: 14, marginBottom: 6, color: blue }}>
							Password
						</Text>
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
							returnKeyType="done"
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
				</View>
				<View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
					<TouchableOpacity onPress={() => this.props.navigator.dismissModal()}>
						<Text
							style={{
								fontFamily: 'Omnes-Regular',
								color: orange,
								fontSize: 16,
								textAlign: 'center',
								marginBottom: 10
							}}
						>
							ALREADY HAVE AN ACCOUNT?
						</Text>
					</TouchableOpacity>
					<Text style={{ fontFamily: 'Omnes-Regular', textAlign: 'center', fontSize: 12, color: greyThree }}>
						We send very few marketing emails throughout the year and you have the option to unsubscribe at
						any time.
					</Text>
				</View>
			</KeyboardAwareScrollView>
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
	validateInput: data => dispatch(validateInput(data)),
	isSigningUp: bool => dispatch(isSigningUp(bool))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SignUpFirst);
