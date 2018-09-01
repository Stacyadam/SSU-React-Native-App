import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
import Input from './Input';
import UiSettings from '../../config/UiSettings';
import SSUIcon from '../shared/icons/SSUIcon';
import Button from '../shared/buttons/Button';
import { validateInput } from '../../actions/AccountActions';

const { orange, greyThree, blue } = UiSettings.styles.colors;

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
					<Input
						label="Email"
						value={this.state.email}
						onChangeText={email => this.setState({ email })}
						returnKeyType="next"
						keyboardType="phone-pad"
						error={this.props.errors && this.props.errors.email ? this.props.errors.email[0] : ''}
						style={{
							marginBottom: 10
						}}
					/>
					<Text style={{ color: orange, marginLeft: 10, marginBottom: 20 }}>
						WE NEVER SELL OR SHARE EMAILS
					</Text>
					<Input
						label="Password"
						value={this.state.password}
						onChangeText={password => this.setState({ password })}
						returnKeyType="done"
						keyboardType="phone-pad"
						error={this.props.errors && this.props.errors.password ? this.props.errors.password[0] : ''}
						style={{
							marginBottom: 10
						}}
					/>
					<Button
						onPress={() =>
							this.props.validateInput({ email: this.state.email, password: this.state.password })
						}
					>
						CONTINUE
					</Button>
					<Text style={{ color: orange, textAlign: 'center', marginBottom: 10 }}>
						ALREADY HAVE AN ACCOUNT?
					</Text>
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
	errors: state.global.errors
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
