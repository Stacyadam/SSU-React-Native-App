import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Input from '../forms/Input';
import RadioButton from '../forms/RadioButton';
import UiSettings from '../../config/UiSettings';
import SSUIcon from '../shared/icons/SSUIcon';
import Button from '../shared/buttons/Button';
import ThreeDots from '../shared/icons/ThreeDots';

import { signUp } from '../../actions/AccountActions.js';

const { orange, darkOrange, blue } = UiSettings.styles.colors;

class SignUpThird extends Component {
	state = {
		birthday: '1987-11-29',
		gender: 'M'
	};

	/*============================================================
	 == Render Methods
	/============================================================*/

	render() {
		const B = ({ children }) => <Text style={{ fontWeight: 'bold' }}>{children}</Text>;

		const { birthday, gender } = this.state;

		return (
			<View
				style={{
					display: 'flex',
					height: '100%'
				}}
			>
				<Text
					style={{
						marginVertical: 14,
						textAlign: 'center',
						color: orange,
						fontSize: 20,
						lineHeight: 30
					}}
				>
					SWEET!
				</Text>
				<Text
					style={{
						textAlign: 'center',
						fontSize: 12,
						lineHeight: 18,
						paddingHorizontal: 10,
						marginBottom: 4
					}}
				>
					JUST ONE STEP AWAY FROM ENDLESS LOCAL REWARDS...
				</Text>
				<View style={{ paddingHorizontal: 24 }}>
					<Input
						label="Date of Birth"
						placeholder="MM/DD/YYYY"
						value={birthday}
						onChangeText={input => this.setState({ input })}
						returnKeyType="next"
						keyboardType="phone-pad"
						style={{
							marginBottom: 10
						}}
					/>
					<Text
						style={{
							textAlign: 'center',
							fontSize: 12,
							color: orange,
							lineHeight: 18,
							paddingHorizontal: 10,
							marginBottom: 20
						}}
					>
						MUST BE 13+ YEARS OLD TO PARTICIPATE
					</Text>
					<Text
						style={{
							color: blue,
							fontSize: 12,
							marginLeft: 6,
							marginBottom: 4
						}}
					>
						Gender
					</Text>
					<View
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							flexDirection: 'row',
							marginBottom: 10
						}}
					>
						<RadioButton style={{ flex: 1, marginRight: 0 }}>
							<Text>Male</Text>
						</RadioButton>
						<RadioButton style={{ flex: 1 }}>
							<Text>Female</Text>
						</RadioButton>
						<RadioButton style={{ flex: 1 }}>
							<Text>N/A</Text>
						</RadioButton>
					</View>
				</View>
				<Button
					width="70%"
					onPress={() => this.props.signUp({ birthday, gender, ...this.props.user })}
				>
					CREATE ACCOUNT
				</Button>
				<Text
					style={{ textAlign: 'center', fontSize: 10, marginHorizontal: 20, lineHeight: 16, marginBottom: 8 }}
				>
					By clicking <B>Create Account</B>, you are agreeing to the Small Shops
					<Text style={{ color: blue }} onPress={() => console.log('link')}>
						{' '}
						Terms of Use{' '}
					</Text>
					and
					<Text style={{ color: blue }} onPress={() => console.log('link')}>
						{' '}
						Privacy Policy{' '}
					</Text>
				</Text>
				<ThreeDots style={{ marginTop: 60 }} dotOne={orange} dotTwo={orange} dotThree={darkOrange} />
			</View>
		);
	}

	/*============================================================
	 == Methods
	/============================================================*/
}

const mapStateToProps = state => ({
	user: state.account.user,
	errors: state.global.errors
});

const mapDispatchToProps = dispatch => ({
	signUp: async data => {
		try {
			const success = await dispatch(signUp(data));
			//TODO: after a successful sign up call this.props.navigator and hide the modal
			return success;
		} catch (e) {
			return e;
		}
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SignUpThird);
