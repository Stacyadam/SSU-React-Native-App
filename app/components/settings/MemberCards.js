import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import Divider from '../shared/Divider';
import Button from '../shared/buttons/Button';
import ModalHeader from '../headers/ModalHeader';
import SSUIcon from '../shared/icons/SSUIcon';
import RequestCardForm from './RequestCardForm.js';
import UiSettings from '../../config/UiSettings';

const { greySix, greyFive, orange, errorRed, greyOne } = UiSettings.styles.colors;

class MemberCards extends Component {
	static navigatorStyle = {
		navBarHidden: true
	};

	state = {
		hasCards: true,
		showRequestForm: false
	};

	render() {
		return (
			<View style={{ flex: 1 }}>
				<ModalHeader
					onBack={() =>
						this.state.showRequestForm
							? this.setState({ showRequestForm: false })
							: this.props.navigator.dismissModal()
					}
					title="MEMBER CARDS"
					navigator={this.props.navigator}
				/>

				{!this.state.showRequestForm ? (
					<View style={{ flex: 1, alignItems: 'center' }}>
						<Text style={{ marginVertical: 30, fontSize: 20 }}>MY CARDS</Text>
						{this.state.hasCards ? (
							<View style={{ justifyContent: 'center', alignItems: 'center' }}>
								<Image
									source={{
										uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'
									}}
									style={{
										width: 125,
										height: 75,
										borderRadius: 5,
										marginBottom: 10
									}}
								/>
								<Text style={{ textAlign: 'center', fontSize: 16, marginBottom: 10 }}>Card Number</Text>
								<Text
									style={{
										textAlign: 'center',
										marginBottom: 10,
										color: orange,
										fontSize: 18,
										fontWeight: 'bold'
									}}
								>
									12342
								</Text>

								<Button
									onPress={() => console.log('remove card')}
									style={{
										paddingHorizontal: 20,
										backgroundColor: errorRed,
										borderRadius: 5,
										marginBottom: 30
									}}
								>
									Remove
								</Button>
							</View>
						) : (
							<View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 }}>
								<Text style={{ textAlign: 'center', marginBottom: 40 }}>
									It looks like you don't have a member card linked to your account yet.
								</Text>
							</View>
						)}

						<TouchableOpacity
							onPress={() => this.setState({ showRequestForm: true })}
							style={{ justifyContent: 'center', alignItems: 'center' }}
						>
							<View
								style={{
									backgroundColor: greyOne,
									width: 125,
									height: 75,
									borderRadius: 5,
									marginBottom: 5
								}}
							>
								<SSUIcon
									name="plus"
									size={30}
									color={greyFive}
									style={{
										position: 'absolute',
										top: 0,
										right: 0,
										left: 0,
										bottom: 0,
										justifyContent: 'center',
										alignItems: 'center'
									}}
								/>
							</View>
							<Text style={{ textAlign: 'center', fontSize: 16, color: orange }}>Request a Card</Text>
						</TouchableOpacity>
					</View>
				) : (
					<RequestCardForm />
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({});

export default MemberCards;
