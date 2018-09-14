import React, { Component } from 'react';
import { View, Text, TextInput, Picker, TouchableOpacity, Image } from 'react-native';
import Router from '../../router';
import { connect } from 'react-redux';
import SignIn from '../forms/SignIn';
import { signIn, isSigningUp } from '../../actions/AccountActions';
import UiSettings from '../../config/UiSettings';
import Button from '../shared/buttons/Button';
import * as GlobalActions from '../../actions/GlobalActions';

const { orange, errorRed, greySix } = UiSettings.styles.colors;

class LogIn extends Component {
	state = {
		email: '',
		password: ''
	};

	componentDidUpdate(prevProps) {
		if (prevProps.token !== this.props.token) {
			Router.startApp();
		}
	}

	static navigatorStyle = {
		navBarHidden: true
	};

	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'space-between' }}>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
						marginTop: 80,
						marginBottom: 20
					}}
				>
					<Image
						source={require('../../assets/ssu_logo.png')}
						style={{ height: 40, marginRight: 4 }}
						resizeMode="contain"
					/>
					<Text style={{ fontFamily: 'Omnes-Regular', color: greySix, fontSize: 24 }}>
						Small Shops United
					</Text>
				</View>
				<View style={{ height: 250, justifyContent: 'center' }}>
					{this.props.errors && this.renderErrors()}
					<SignIn onChangeText={input => this.setState(input)} />
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'flex-end',
							alignItems: 'center',
							flex: 1,
							width: '100%',
							paddingRight: 20
						}}
					>
						<TouchableOpacity
							onPress={() =>
								this.props.navigator.showModal({
									screen: 'SSU.ForgotPassword',
									passProps: { navigator: this.props.navigator }
								})
							}
						>
							<Text style={{ fontFamily: 'Omnes-Regular', fontSize: 16, color: orange, marginRight: 10 }}>
								I forgot my password
							</Text>
						</TouchableOpacity>
						<View>
							<Button
								style={{ width: 80 }}
								loading={this.props.loading}
								onPress={() =>
									this.props.signIn({ email: this.state.email, password: this.state.password })
								}
							>
								SIGN IN
							</Button>
						</View>
					</View>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'flex-end',
							flex: 1,
							width: '100%',
							paddingRight: 20
						}}
					>
						<Text style={{ fontFamily: 'Omnes-Regular', fontSize: 14, marginRight: 10 }}>
							Don't have an account?
						</Text>
						<TouchableOpacity onPress={() => this.showSignUp()}>
							<Text style={{ fontFamily: 'Omnes-Regular', fontSize: 16, color: orange }}>
								Create one now!
							</Text>
						</TouchableOpacity>
					</View>
				</View>
				<Image
					source={require('../../assets/buildings-new.png')}
					style={{ height: 128, width: '100%' }}
					resizeMode="contain"
				/>
			</View>
		);
	}

	renderErrors() {
		const { email, password } = this.props.errors;
		if (email && password) {
			return (
				<View>
					<Text style={{ fontFamily: 'Omnes-Regular', marginLeft: 20, color: errorRed }}>{email[0]}</Text>
					<Text style={{ fontFamily: 'Omnes-Regular', marginLeft: 20, color: errorRed }}>{password[0]}</Text>
				</View>
			);
		} else if (email) {
			return <Text style={{ fontFamily: 'Omnes-Regular', marginLeft: 20, color: errorRed }}>{email[0]}</Text>;
		} else if (password) {
			return <Text style={{ fontFamily: 'Omnes-Regular', marginLeft: 20, color: errorRed }}>{password[0]}</Text>;
		} else {
			return (
				<Text style={{ fontFamily: 'Omnes-Regular', marginLeft: 20, color: errorRed }}>
					{this.props.errors}
				</Text>
			);
		}
	}

	showSignUp() {
		this.props.clearErrors();
		this.props.isSigningUp(true);
		this.props.navigator.showModal({ screen: 'SSU.SignUpModal' });
	}

	closeModal() {
		//TODO: register the modal as a screen and call this.props.navigator.showModal() instead.
		this.props.navigator.dismissAllModals();
	}
}

const mapStateToProps = state => ({
	user: state.account.user,
	token: state.account.token,
	errors: state.global.errors,
	loading: state.global.loading
});

const mapDispatchToProps = dispatch => ({
	signIn: user => dispatch(signIn(user)),
	isSigningUp: bool => dispatch(isSigningUp(bool)),
	clearErrors: () => dispatch(GlobalActions.updateErrors(null))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LogIn);
