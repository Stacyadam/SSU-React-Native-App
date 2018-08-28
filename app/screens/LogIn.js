import React, { Component } from 'react';
import { Button, View, Text, TextInput, Picker, TouchableOpacity, Modal } from 'react-native';
import Router from '../router';
import SignIn from '../components/forms/SignIn';
import { connect } from 'react-redux';
import { signIn, updateErrors } from '../actions/AccountActions';
import UiSettings from '../config/UiSettings';
import SignUpModal from '../components/modals/SignUpModal';
import { Navigation } from 'react-native-navigation';

const { orange, errorRed } = UiSettings.styles.colors;

class LogIn extends Component {
	state = {
		email: '',
		password: '',
		showModal: false
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.token) {
			Router.startApp();
		}
	}

	render() {
		return (
			<View style={{ display: 'flex', height: '100%', justifyContent: 'center' }}>
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
						<Text style={{ color: orange, marginRight: 10 }}>I forgot my password</Text>
						<View
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								backgroundColor: orange,
								height: 30,
								width: 100
							}}
						>
							<TouchableOpacity
								onPress={() =>
									this.props.signIn({ email: this.state.email, password: this.state.password })
								}
							>
								<Text style={{ color: '#FFF', fontWeight: 'bold' }}>SIGN IN</Text>
							</TouchableOpacity>
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
						<Text style={{ marginRight: 10 }}>Don't have an account?</Text>
						<TouchableOpacity onPress={() => this.showSignUp()}>
							<Text style={{ color: orange }}>Create one now!</Text>
						</TouchableOpacity>
					</View>
				</View>
				<SignUpModal visible={this.state.showModal} closeModal={() => this.closeModal()} />
			</View>
		);
	}

	renderErrors() {
		const { email, password } = this.props.errors;
		if (email && password) {
			return (
				<View>
					<Text style={{ marginLeft: 20, color: errorRed }}>{email[0]}</Text>
					<Text style={{ marginLeft: 20, color: errorRed }}>{password[0]}</Text>
				</View>
			);
		} else if (email) {
			return <Text style={{ marginLeft: 20, color: errorRed }}>{email[0]}</Text>;
		} else if (password) {
			return <Text style={{ marginLeft: 20, color: errorRed }}>{password[0]}</Text>;
		} else {
			return <Text style={{ marginLeft: 20, color: errorRed }}>{this.props.errors}</Text>;
		}
	}

	showSignUp() {
		this.props.clearErrors();
		this.setState({ showModal: true });
	}

	closeModal() {
		this.setState({ showModal: false });
	}
}

const mapStateToProps = state => ({
	token: state.account.token,
	errors: state.account.errors
});

const mapDispatchToProps = dispatch => ({
	signIn: user => {
		dispatch(signIn(user));
	},
	clearErrors: () => {
		dispatch(updateErrors(null));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LogIn);
