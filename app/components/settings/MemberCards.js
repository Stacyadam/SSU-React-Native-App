import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import Divider from '../shared/Divider';
import Button from '../shared/buttons/Button';
import ModalHeader from '../headers/ModalHeader';
import SSUIcon from '../shared/icons/SSUIcon';
import RequestCardForm from './RequestCardForm.js';
import UiSettings from '../../config/UiSettings';
import { getMemberCards, removeMemberCard } from '../../actions/MemberCardActions';

const { greySix, greyFive, orange, errorRed, greyOne } = UiSettings.styles.colors;

class MemberCards extends Component {
	static navigatorStyle = {
		navBarHidden: true
	};

	state = {
		memberCards: [],
		showRequestForm: false
	};

	componentDidUpdate(prevProps) {
		const { memberCards } = this.props;
		if (prevProps.memberCards !== memberCards) this.setState({ memberCards });
	}

	componentWillMount() {
		this.props.getMemberCards();
	}

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
					<View style={{ alignItems: 'center' }}>
						<Text style={{ fontFamily: 'Omnes-Regular', marginVertical: 30, fontSize: 22 }}>MY CARDS</Text>
						{this.props.loading ? (
							<View style={{ height: 50, marginBottom: 20 }}>
								<ActivityIndicator
									size="large"
									color={orange}
									animating={this.props.loading}
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
						) : this.state.memberCards.length ? (
							<View style={{ height: 180, marginHorizontal: 10, marginBottom: 20 }}>
								<FlatList
									data={this.state.memberCards}
									horizontal
									keyExtractor={item => item.id.toString()}
									ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
									renderItem={({ item }) => (
										<View style={{ alignItems: 'center', justifyContent: 'center' }}>
											<Image
												source={require('../../assets/member-card.png')}
												style={{
													width: 125,
													height: 75,
													borderRadius: 5,
													marginBottom: 10
												}}
											/>
											<Text
												style={{
													fontFamily: 'Omnes-Regular',
													textAlign: 'center',
													fontSize: 16,
													marginBottom: 10
												}}
											>
												Card Number
											</Text>
											<Text
												style={{
													textAlign: 'center',
													marginBottom: 10,
													color: orange,
													fontSize: 18,
													fontWeight: 'bold'
												}}
											>
												{item.number}
											</Text>
											<Button
												loading={this.props.loading}
												onPress={() => this.props.removeMemberCard(item.id)}
												style={{
													width: 80,
													backgroundColor: errorRed,
													borderRadius: 5
												}}
											>
												Remove
											</Button>
										</View>
									)}
								/>
							</View>
						) : (
							<View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30 }}>
								<Text
									style={{
										fontFamily: 'Omnes-Regular',
										fontSize: 16,
										textAlign: 'center',
										marginBottom: 40
									}}
								>
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
							<Text
								style={{
									fontFamily: 'Omnes-Regular',
									textAlign: 'center',
									fontSize: 18,
									color: orange
								}}
							>
								Request a Card
							</Text>
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

const mapStateToProps = state => ({
	memberCards: state.memberCards.memberCards,
	loading: state.global.loading
});

const mapDispatchToProps = dispatch => ({
	getMemberCards: () => dispatch(getMemberCards()),
	removeMemberCard: memberCard => dispatch(removeMemberCard(memberCard))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MemberCards);
