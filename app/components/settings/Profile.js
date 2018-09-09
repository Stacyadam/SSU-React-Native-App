import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import EditProfileForm from '../settings/EditProfileForm';
import SSUIcon from '../shared/icons/SSUIcon';
import ModalHeader from '../headers/ModalHeader';
import UiSettings from '../../config/UiSettings';
import { genderString, formatPhoneNumber, isoToLongDate } from '../../utilities';

const { greySix, greyFive, greyTwo, greyOne } = UiSettings.styles.colors;

class Profile extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
	// }

	// onNavigatorEvent({ id }) {
	// 	if (id === 'willAppear') {
	// 	}
	// }

	state = {
		settings: [],
		editMode: false,
		editIndex: 0
	};

	static navigatorStyle = {
		navBarHidden: true
	};

	render() {
		const { editMode } = this.state;
		return (
			<View style={{ flex: 1 }}>
				<ModalHeader
					title="PROFILE"
					navigator={this.props.navigator}
					onBack={() =>
						this.state.editMode
							? this.setState({ editMode: false })
							: this.props.navigator.dismissAllModals()
					}
				/>
				{!editMode && this.renderInfo()}
				{editMode && this.renderEditMode()}
			</View>
		);
	}

	renderInfo() {
		const {
			user: { full_name, email, phone, birthday, gender, zip_code }
		} = this.props;

		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
				<TouchableOpacity
					onPress={() => {
						this.setState({ editMode: true, editIndex: 0 });
					}}
					style={{
						width: '100%',
						marginBottom: 20,
						backgroundColor: greyOne,
						paddingTop: 70,
						paddingBottom: 20,
						paddingHorizontal: 6
					}}
				>
					<View
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							position: 'absolute',
							top: -62.5,
							right: 0,
							left: 0
						}}
					>
						<Image
							source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
							style={{
								width: 125,
								height: 125,
								borderRadius: 62.5
							}}
						/>
					</View>
					<View
						style={{
							position: 'absolute',
							top: 10,
							right: 12
						}}
					>
						<SSUIcon name="pencil" size={20} color={greyFive} />
					</View>
					<Text style={{ textAlign: 'center', fontSize: 18, marginBottom: 6 }}>{full_name}</Text>
					<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
						<SSUIcon
							name="envelope"
							size={20}
							color={greyFive}
							style={{ alignSelf: 'flex-start', marginRight: 10 }}
						/>
						<Text style={{ textAlign: 'center', fontSize: 18, marginBottom: 6 }}>{email}</Text>
					</View>
					<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
						<SSUIcon
							name="phone"
							size={24}
							color={greyFive}
							style={{ alignSelf: 'flex-start', marginRight: 10 }}
						/>
						<Text style={{ textAlign: 'center', fontSize: 18, marginBottom: 20 }}>
							{formatPhoneNumber(phone)}
						</Text>
					</View>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center',
							marginBottom: 6
						}}
					>
						<Text style={{ textAlign: 'right', flex: 1, marginRight: 20 }}>Date of Birth:</Text>
						<Text style={{ fontSize: 18, flex: 1 }}>{isoToLongDate(birthday)}</Text>
					</View>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center',
							marginBottom: 6
						}}
					>
						<Text style={{ textAlign: 'right', flex: 1, marginRight: 20 }}>Gender:</Text>
						<Text style={{ fontSize: 18, flex: 1 }}>{genderString(gender)}</Text>
					</View>
					<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
						<Text style={{ textAlign: 'right', flex: 1, marginRight: 20 }}>Zip Code:</Text>
						<Text style={{ fontSize: 18, flex: 1 }}>{zip_code}</Text>
					</View>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => {
						this.setState({ editMode: true, editIndex: 1 });
					}}
					style={{
						width: '100%',
						backgroundColor: greyOne,
						paddingVertical: 10,
						paddingLeft: 20
					}}
				>
					<View
						style={{
							position: 'absolute',
							top: 6,
							right: 12
						}}
					>
						<SSUIcon name="pencil" size={20} color={greyFive} />
					</View>
					<Text style={{ fontSize: 16, fontWeight: 'bold' }}>Change Password</Text>
					<Text style={{ lineHeight: 20 }}>Choose a unique password to protect your account</Text>
				</TouchableOpacity>
			</View>
		);
	}

	renderEditMode() {
		if (this.state.editMode) {
			return (
				<EditProfileForm
					user={this.props.user}
					editIndex={this.state.editIndex}
					onSuccess={() => this.setState({ editMode: false })}
				/>
			);
		}
	}
}

const styles = StyleSheet.create({});

const mapStateToProps = state => ({
	user: state.account.user
});

export default connect(mapStateToProps)(Profile);
