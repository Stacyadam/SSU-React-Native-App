import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Linking } from 'react-native';
import DatePicker from 'react-native-datepicker';
import Input from '../forms/Input';
import RadioButton from '../forms/RadioButton';
import UiSettings from '../../config/UiSettings';
import SSUIcon from '../shared/icons/SSUIcon';
import Button from '../shared/buttons/Button';
import ThreeDots from '../shared/icons/ThreeDots';

import { signUp, isSigningUp } from '../../actions/AccountActions';

const { orange, darkOrange, blue, greyTwo } = UiSettings.styles.colors;

class SignUpThird extends Component {
	state = {
		birthday: '',
		gender: ''
	};

	/*============================================================
	 == Render Methods
	/============================================================*/

	render() {
		const B = ({ children }) => <Text style={{ fontFamily: 'Omnes-Regular', fontWeight: 'bold' }}>{children}</Text>;

		const { birthday, gender } = this.state;

		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'space-between'
				}}
			>
				<View>
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
							fontSize: 14,
							lineHeight: 18,
							paddingHorizontal: 40
						}}
					>
						JUST ONE STEP AWAY FROM ENDLESS LOCAL REWARDS...
					</Text>
				</View>

				<View style={{ paddingHorizontal: 24 }}>
					<Text style={{ fontFamily: 'Omnes-Regular', fontSize: 12, marginBottom: 6, color: blue }}>
						First Name
					</Text>
					<View
						style={{
							borderColor: blue,
							borderWidth: 1,
							marginBottom: 10,
							height: 36,
							justifyContent: 'center'
						}}
					>
						<DatePicker
							date={this.state.birthday}
							mode="date"
							placeholder="select date"
							format="YYYY-MM-DD"
							minDate="1900-01-01"
							maxDate="2018-12-12"
							confirmBtnText="Confirm"
							cancelBtnText="Cancel"
							showIcon={false}
							customStyles={{
								dateInput: {
									borderWidth: 0,
									position: 'absolute',
									left: 10
								},
								dateText: {
									color: 'black'
								},
								btnText: {
									position: 'relative'
								}
							}}
							onDateChange={birthday => {
								this.setState({ birthday });
							}}
						/>
					</View>
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
							marginBottom: 10
						}}
					>
						Gender
					</Text>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',
							marginBottom: 20
						}}
					>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text style={{ fontFamily: 'Omnes-Regular', marginRight: 5 }}>Male</Text>
							<RadioButton
								color={greyTwo}
								backgroundColor={orange}
								selected={this.state.gender === 'M'}
								checked={this.state.gender === 'M'}
								onPress={() => this.setState({ gender: 'M' })}
								style={{ marginRight: 10 }}
							/>
						</View>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text style={{ fontFamily: 'Omnes-Regular', marginRight: 5 }}>Female</Text>
							<RadioButton
								color={greyTwo}
								backgroundColor={orange}
								selected={this.state.gender === 'F'}
								checked={this.state.gender === 'F'}
								onPress={() => this.setState({ gender: 'F' })}
								style={{ marginRight: 10 }}
							/>
						</View>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text style={{ fontFamily: 'Omnes-Regular', marginRight: 5 }}>N/A</Text>
							<RadioButton
								color={greyTwo}
								backgroundColor={orange}
								selected={this.state.gender === 'O'}
								checked={this.state.gender === 'O'}
								onPress={() => this.setState({ gender: 'O' })}
								style={{ marginRight: 10 }}
							/>
						</View>
					</View>
					<Button
						style={{ marginBottom: 20, width: 175 }}
						loading={this.props.loading}
						onPress={() => this.props.signUp({ birthday, gender, ...this.props.user })}
					>
						CREATE ACCOUNT
					</Button>
				</View>

				<View style={{ marginBottom: 20 }}>
					<Text
						style={{
							textAlign: 'center',
							fontSize: 10,
							marginHorizontal: 40,
							lineHeight: 16,
							marginBottom: 30
						}}
					>
						By clicking <B>Create Account</B>, you are agreeing to the Small Shops
						<Text
							style={{ color: blue }}
							onPress={() => Linking.openURL('https://www.smallshopsunited.com/terms')}
						>
							{' '}
							Terms of Use{' '}
						</Text>
						and
						<Text
							style={{ color: blue }}
							onPress={() => Linking.openURL('https://www.smallshopsunited.com/privacy')}
						>
							{' '}
							Privacy Policy{' '}
						</Text>
					</Text>
					<ThreeDots dotOne={orange} dotTwo={orange} dotThree={darkOrange} />
				</View>
			</View>
		);
	}

	/*============================================================
	 == Methods
	/============================================================*/
}

const mapStateToProps = state => ({
	user: state.account.user,
	errors: state.global.errors,
	loading: state.global.loading
});

const mapDispatchToProps = dispatch => ({
	signUp: async data => {
		try {
			const success = await dispatch(signUp(data));
			if (success) {
				dispatch(isSigningUp(false));
			}
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
