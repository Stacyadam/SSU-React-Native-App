import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import ModalHeader from '../headers/ModalHeader';
import Button from '../shared/buttons/Button';
import TransparentModal from '../modals/TransparentModal';
import { requestPassword } from '../../actions/AccountActions';

import UiSettings from '../../config/UiSettings';

const { orange, greySix, greyTwo, errorRed, greyFive } = UiSettings.styles.colors;

class ForgotPassword extends Component {
	static navigatorStyle = {
		navBarHidden: true
	};

	state = {
		email: '',
		showInfo: false
	};

	render() {
		return (
			<View style={{ flex: 1 }}>
				<ModalHeader title="PASSWORD RESET" navigator={this.props.navigator} />
				<View style={{ flex: 1, alignItems: 'center', padding: 10 }}>
					<Text style={{ color: orange, fontSize: 18, marginVertical: 20 }}>LOST PASSWORD?</Text>
					<Text style={{ color: greySix, fontSize: 16, textAlign: 'center', marginBottom: 20 }}>
						Enter your account email and we'll send you a link to reset your password.
					</Text>
					<View style={{ width: '90%' }}>
						{this.props.errors && this.props.errors.email ? (
							<Text style={{ fontSize: 12, marginBottom: 6, color: errorRed }}>
								Please provide a valid email address
							</Text>
						) : (
							<Text style={{ fontSize: 12, marginBottom: 6 }}>Email</Text>
						)}
						<TextInput
							style={{
								borderColor: orange,
								borderWidth: 1,
								marginBottom: 10,
								height: 30,
								paddingRight: 20
							}}
							onChangeText={email => this.setState({ email })}
							value={this.state.email}
							autoCorrect={false}
							autoCapitalize="none"
						/>
						<Button loading={this.props.loading} onPress={() => this.requestPassword()}>
							SEND LINK
						</Button>
					</View>
				</View>
				<TransparentModal visible={this.state.showInfo}>
					<View
						style={{
							backgroundColor: '#FFF',
							width: '90%',
							height: 250,
							justifyContent: 'center',
							alignItems: 'center',
							padding: 8
						}}
					>
						<Text style={{ fontSize: 18, textAlign: 'center', color: orange, marginBottom: 20 }}>
							RESET EMAIL SENT
						</Text>
						<Text style={{ textAlign: 'center', color: greySix, marginBottom: 20 }}>
							An email has been sent to your email address with a link to reset your password.
						</Text>
						<Button onPress={() => this.goToLogin()} style={{ width: 80, marginBottom: 20 }}>
							OK
						</Button>
						<Text style={{ fontSize: 12, textAlign: 'center', color: greyFive }}>
							If you don't find the email in your inbox, be sure to check your 'junk' or 'spam' folders.
						</Text>
					</View>
				</TransparentModal>
			</View>
		);
	}

	goToLogin() {
		this.setState({ showInfo: false });
	}

	async requestPassword() {
		const { email } = this.state;
		const success = await this.props.requestPassword(email);

		if (success) this.setState({ showInfo: true });
	}
}

const mapStateToProps = state => ({
	errors: state.global.errors,
	loading: state.global.loading
});

const mapDispatchToProps = dispatch => ({
	requestPassword: async email => await dispatch(requestPassword(email))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ForgotPassword);
